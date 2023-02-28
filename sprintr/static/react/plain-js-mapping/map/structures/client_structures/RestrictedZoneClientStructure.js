import ClientStructure from "./ClientStructure";
import deleteButtonIconSVG from "../icons/delete_zone.svg";
import scaleButtonIconSVG from "../icons/scale_zone.svg";
import { calculateBoxAroundPoint, isInsideBox } from "../../utils/helpers";
const img_delete_button = new Image();
img_delete_button.src = deleteButtonIconSVG;
const img_scale_button = new Image();
img_scale_button.src = scaleButtonIconSVG;
const buttonHitboxPadding = 22.5;
class RestrictedZoneClientStructure extends ClientStructure {
  constructor(x0, y0, x1, y1, x2, y2, x3, y3, active) {
    super(x0, y0);
    this.activeStyle = {
      stroke: "rgb(0, 255, 0)",
      fill: "rgba(0, 255, 0, 0)"
    };
    this.style = {
      stroke: "rgb(0, 255, 0)",
      fill: "rgba(0, 255, 0, 0.4)"
    };
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.active = active ?? true;
  }
  draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor) {
    const ctx = ctxWrapper.getContext();
    const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
    const p1 = new DOMPoint(this.x1, this.y1).matrixTransform(transformationMatrixToScreenSpace);
    const p2 = new DOMPoint(this.x2, this.y2).matrixTransform(transformationMatrixToScreenSpace);
    const p3 = new DOMPoint(this.x3, this.y3).matrixTransform(transformationMatrixToScreenSpace);
    ctxWrapper.save();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    if (!this.active) {
      ctx.strokeStyle = this.style.stroke;
      ctx.fillStyle = this.style.fill;
    } else {
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = this.style.stroke;
      ctx.fillStyle = this.style.fill;
    }
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = "rgba(0,0,0, 1)";
    ctx.shadowBlur = 2;
    ctx.stroke();
    ctxWrapper.restore();
    if (this.active) {
      ctx.drawImage(img_delete_button, p1.x - img_delete_button.width / 2, p1.y - img_delete_button.height / 2);
      ctx.drawImage(img_scale_button, p2.x - img_scale_button.width / 2, p2.y - img_scale_button.height / 2);
    }
  }
  postProcess() {
    this.x0 = Math.round(this.x0);
    this.y0 = Math.round(this.y0);
    this.x1 = Math.round(this.x1);
    this.y1 = Math.round(this.y1);
    this.x2 = Math.round(this.x2);
    this.y2 = Math.round(this.y2);
    this.x3 = Math.round(this.x3);
    this.y3 = Math.round(this.y3);
  }
  tap(tappedPoint, transformationMatrixToScreenSpace) {
    const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
    const p1 = new DOMPoint(this.x1, this.y1).matrixTransform(transformationMatrixToScreenSpace);
    const p2 = new DOMPoint(this.x2, this.y2).matrixTransform(transformationMatrixToScreenSpace);
    const deleteButtonHitbox = calculateBoxAroundPoint(p1, buttonHitboxPadding);
    if (this.active && isInsideBox(tappedPoint, deleteButtonHitbox)) {
      return {
        deleteMe: true,
        stopPropagation: true
      };
    } else if (isInsideBox(tappedPoint, {
      topLeftBound: p0,
      bottomRightBound: p2
    })) {
      this.active = true;
      return {
        stopPropagation: true
      };
    } else if (this.active) {
      this.active = false;
      return {
        stopPropagation: false,
        requestDraw: true
      };
    } else {
      return {
        stopPropagation: false
      };
    }
  }
  translate(startCoordinates, lastCoordinates, currentCoordinates, transformationMatrixToScreenSpace, pixelSize) {
    if (this.active) {
      const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
      const p2 = new DOMPoint(this.x2, this.y2).matrixTransform(transformationMatrixToScreenSpace);
      const resizeButtonHitbox = calculateBoxAroundPoint(p2, buttonHitboxPadding);
      if (!this.isResizing && isInsideBox(lastCoordinates, resizeButtonHitbox)) {
        this.isResizing = true;
      }
      const {
        dx,
        dy,
        currentInMapSpace
      } = ClientStructure.calculateTranslateDelta(lastCoordinates, currentCoordinates, transformationMatrixToScreenSpace);
      if (this.isResizing) {
        if (currentInMapSpace.x > this.x0 + pixelSize && this.x1 + dx > this.x0 + pixelSize) {
          this.x1 += dx;
          this.x2 += dx;
        }
        if (currentInMapSpace.y > this.y0 + pixelSize && this.y2 + dy > this.y0 + pixelSize) {
          this.y2 += dy;
          this.y3 += dy;
        }
        return {
          stopPropagation: true
        };
      } else if (isInsideBox(lastCoordinates, {
        topLeftBound: p0,
        bottomRightBound: p2
      })) {
        this.x0 += dx;
        this.y0 += dy;
        this.x1 += dx;
        this.y1 += dy;
        this.x2 += dx;
        this.y2 += dy;
        this.x3 += dx;
        this.y3 += dy;
        return {
          stopPropagation: true
        };
      } else {
        this.active = false;
      }
    }
    return {
      stopPropagation: false
    };
  }
  getType() {
    return RestrictedZoneClientStructure.TYPE;
  }
}
RestrictedZoneClientStructure.TYPE = "RestrictedZoneClientStructure";
export default RestrictedZoneClientStructure;