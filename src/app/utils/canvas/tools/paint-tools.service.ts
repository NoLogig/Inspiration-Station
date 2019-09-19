import { Injectable } from '@angular/core';
import { IPoint, IRGBA, ICirclePoint, IRectPoint } from 'src/app/services/math/interfaces/imath';
import maths, { CIRCLE, utils } from 'src/app/services/math/math.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasPaintToolsService {

  grid = {

    init(ctx: CanvasRenderingContext2D, width: number, height: number, gridSize: number, strokeStyle = '#0ff7'): void {
      
      ctx.save();
      ctx.strokeStyle = strokeStyle;

      ctx.beginPath();

      for (let x = gridSize - 1, y = gridSize; x <= width || y <= height; x += gridSize, y += gridSize) {

        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
  
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      return;
    },

    move2Nearest(ctx: CanvasRenderingContext2D, x: number, y: number, gridSize: number) {

      let gridX = utils.roundNearest(x, gridSize),  // event.clientX
          gridY = utils.roundNearest(y, gridSize);  // event.clientY
  
      ctx.beginPath();
      ctx.arc(gridX, gridY, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      return;
    }

  }

  constructor() { }

  drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number): void {

    ctx.beginPath();
    ctx.arc(x, y, 1, 0, CIRCLE);
    ctx.closePath();
    ctx.fill();
    return;
  }

  drawLine(ctx: CanvasRenderingContext2D, p1: IPoint, p2: IPoint): void {

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
    return;
  }

  drawRect(ctx: CanvasRenderingContext2D, shape: IRectPoint): void {

    ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
    ctx.fill();
    return;
  }

  drawCircle(ctx: CanvasRenderingContext2D, shape: ICirclePoint): void {

    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.r, 0, 6.29);
    ctx.closePath();
    ctx.fill();
    return;
  }
  
  drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    
    let slice = Math.PI * 2 / 6;
    x = x + Math.cos(0) * size;
    y = y + Math.sin(0) * size;
    
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1, r = 1; i < 6; i++) {

      r = i * slice;
      x = x + Math.cos(r) * size;
      y = y + Math.sin(r) * size;
      ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.stroke();
    return;
  }

  circleAranger(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, numObjects: number) {

    let slice = Math.PI * 2 / numObjects;

    for (let i = 0; i < numObjects; i++) {

      let angle = i * slice;
      let x = centerX + Math.cos(angle) * radius;
      let y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }

    return;
  }

  drawCenter(ctx: CanvasRenderingContext2D, strokeStyle = '#f3f') {

    ctx.strokeStyle = strokeStyle;

    ctx.beginPath();

    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);

    ctx.moveTo(0, ctx.canvas.height / 2);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);

    ctx.closePath();
    ctx.stroke();
    return;
  }

  /** Get RGBA of pixel at x/y coordinates
   * @param imgData
   *+  `data`:`number[]` imgData in RGBA order as 0 to 255 ints
   *+  `height`:`number` Height dimension of `data` in pixels
   *+  `width`:`number` Width dimension of `data` in pixels
   *
   * @returns Object containing RGBA integers of pixel at x/y coordinate
   * @example One Pixel = 4 Elements [R, G, B, A];
   *              index = ( y * width + x ) * 4;
   *
   *   red   = index;
   *   green = index + 1;
   *   blue  = index + 2;
   *   alpha = index + 3;
   */
  getPixel(x: number, y: number, imgData: ImageData, ctx?: CanvasRenderingContext2D, ): IRGBA {

    // let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    // console.log("ImgData @ X/Y:", ctx.getImageData(x,y,1,1));

    let index = (y * imgData.width + x) * 4,
            r = imgData.data[index++],
            g = imgData.data[index++],
            b = imgData.data[index++],
            a = imgData.data[index] / 255;

    return { r, g, b, a };
  }

  /** GreenScreen
   * @param ctx1 
   * @param ctx2 
   * @param video 
   * @param options 
   */
  computeFrame(ctx1: CanvasRenderingContext2D, ctx2: CanvasRenderingContext2D, video: HTMLVideoElement, options: {r: number, g: number; b: number, a: number, nr: number, ng: number; nb: number, na: number}) {

    ctx1.drawImage(video, 0, 0, ctx1.canvas.width, ctx1.canvas.height);
    let frames = ctx1.getImageData(0, 0, ctx1.canvas.width, ctx1.canvas.height);

    // let limit = frames.data.length / 4;
    for (let i = 0, limit = frames.data.length; i < limit; i++) {

      // let r = frames.data[i * 4 + 0];
      // let g = frames.data[i * 4 + 1];
      // let b = frames.data[i * 4 + 2];
      let r = frames.data[i++],
          g = frames.data[i++],
          b = frames.data[i++],
          a = frames.data[i];

      // RGB
      if ( g > options.g && b > options.b && r > options.r) {

        frames.data[i - 3] = options.nr; // r
        frames.data[i - 2] = options.ng; // g
        frames.data[i - 1] = options.nb; // b
      }
      // Alpha - Disable
      // if (a < options.a) { frames.data[i]; = 1; }
    }

    ctx2.putImageData(frames, 0, 0);
    return;
  }

  /* Helpers */
  attachEvent(ele: HTMLElement, event: string, fn: (e: KeyboardEvent | MouseEvent) => void) {
    ele.addEventListener(event, fn);
  }
  detachEvent(ele: HTMLElement, event: string, fn: (e: KeyboardEvent | MouseEvent) => void) {
    ele.removeEventListener(event, fn);
  }

}
let expdef = new CanvasPaintToolsService();
export default expdef;