import Structure from "../Structure";
/*
    ClientStructures are structures that only exists on the client-side
    e.g. a cutting line or the zone selection rectangle
 */
class ClientStructure extends Structure {
  constructor() {
    super(...arguments);
    this.active = false;
  }
  /**
   * Handler for intercepting pan events on the canvas
   * Used for resizing / moving the zone
   *
   * @param {PointCoordinates} startCoordinates - The coordinates where the panning started
   * @param {PointCoordinates} lastCoordinates - The coordinates from the last call
   * @param {PointCoordinates} currentCoordinates - The current coordinates of the pointer
   * @param {DOMMatrix} transformationMatrixToScreenSpace - The transformation for transforming map-space coordinates into screen-space.
   * This is the transform applied by the vacuum-map canvas.
   * @param {number} pixelSize
   */
  translate(startCoordinates, lastCoordinates, currentCoordinates, transformationMatrixToScreenSpace, pixelSize) {
    return {
      stopPropagation: false
    };
  }
  /**
   * This is handler is called on each endTranslate.
   * It allows us to do post-processing such as snapping
   */
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  postProcess() {
    //intentional
  }
  static calculateTranslateDelta(lastCoordinates, currentCoordinates, transformationMatrixToScreenSpace) {
    const transformationMatrixToMapSpace = DOMMatrix.fromMatrix(transformationMatrixToScreenSpace).invertSelf();
    //Temporary workaround for a bug in Chrome 107++. See Canvas2DContextTrackingWrapper.getInvertedTransform for more info
    transformationMatrixToMapSpace.m33 = 1;
    transformationMatrixToMapSpace.m44 = 1;
    const lastInMapSpace = new DOMPoint(lastCoordinates.x, lastCoordinates.y).matrixTransform(transformationMatrixToMapSpace);
    const currentInMapSpace = new DOMPoint(currentCoordinates.x, currentCoordinates.y).matrixTransform(transformationMatrixToMapSpace);
    return {
      dx: currentInMapSpace.x - lastInMapSpace.x,
      dy: currentInMapSpace.y - lastInMapSpace.y,
      lastInMapSpace: lastInMapSpace,
      currentInMapSpace: currentInMapSpace
    };
  }
}
export default ClientStructure;