import MapStructure from "./MapStructure";
class NoMopAreaMapStructure extends MapStructure {
  constructor(x0, y0, x1, y1, x2, y2, x3, y3) {
    super(x0, y0);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
  }
  draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor) {
    const ctx = ctxWrapper.getContext();
    const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
    const p1 = new DOMPoint(this.x1, this.y1).matrixTransform(transformationMatrixToScreenSpace);
    const p2 = new DOMPoint(this.x2, this.y2).matrixTransform(transformationMatrixToScreenSpace);
    const p3 = new DOMPoint(this.x3, this.y3).matrixTransform(transformationMatrixToScreenSpace);
    ctxWrapper.save();
    ctx.strokeStyle = "rgb(200, 0, 255, 0.6)";
    ctx.fillStyle = "rgba(200, 0, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctxWrapper.restore();
  }
  getType() {
    return NoMopAreaMapStructure.TYPE;
  }
}
NoMopAreaMapStructure.TYPE = "NoMopAreaMapStructure";
export default NoMopAreaMapStructure;