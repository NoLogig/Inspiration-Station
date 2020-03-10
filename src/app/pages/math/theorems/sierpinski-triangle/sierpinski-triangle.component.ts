import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { IPoint } from 'src/app/services/math/interfaces/imath';
import cptx from "src/app/utils/tools/paint-tools.service";

@Component({
  selector: 'nlg-triangle-sierpinski',
  templateUrl: './sierpinski-triangle.component.html',
  styleUrls: ['./sierpinski-triangle.component.scss']
})
export class SierpinskiTriangleComponent implements OnDestroy, OnInit {

  @ViewChild('sierpinki', { static: true}) public canvasRef: ElementRef;

  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cWidth: number;
  cHeight: number;
  raf: number;

  points: IPoint[] = [];
  nextPoint: IPoint;

  constructor(public ngZone: NgZone) { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {
    console.log('Sierpinski Init');

    this.initCanvas();
    this.initPoints();

    // cptx.attachEvent(this.c, 'click', this.createNode);
  }

  ngOnDestroy(): void {
    // cptx.detachEvent(this.c, 'click', this.createNode);

    this.cancelRender();

    console.log('Sierpinski Destroy');
  }

  /* ########################### */
  /* ####       Canvas      #### */
  /* ########################### */

  initCanvas(): void {

    this.c = this.canvasRef.nativeElement;
    this.ctx = this.c.getContext('2d');

    this.c.width = this.cWidth = window.innerWidth;
    this.c.height = this.cHeight = window.innerHeight;
    this.ctx.strokeStyle = '#0ff';
    this.ctx.fillStyle = '#0ff';
  }

  initPoints(): void {

    this.ctx.fillText('A', 45, this.cHeight - 50);
    this.ctx.fillText('B', this.cWidth - 50, this.cHeight - 50);
    this.ctx.fillText('C', this.cWidth * .5, 50);

    // A
    this.points[0] = {
      x: 50,
      y: this.cHeight - 50
    };
    // B
    this.points[1] = {
      x: this.cWidth - 50,
      y: this.cHeight - 50
    };
    // C
    this.points[2] = {
      x: this.cWidth * .5,
      y: 50
    };

    cptx.draw.point(this.ctx, this.points[0].x, this.points[0].y);
    cptx.draw.point(this.ctx, this.points[1].x, this.points[1].y);
    cptx.draw.point(this.ctx, this.points[2].x, this.points[2].y);
  }

  createPoint = (e: MouseEvent): void => {

    this.points.push({
      x: e.clientX,
      y: e.clientY
    });
  }

  update(): void {

    let i = Math.floor(Math.random() * this.points.length);

    this.nextPoint.x = (this.points[i].x + this.nextPoint.x) * .5;
    this.nextPoint.y = (this.points[i].y + this.nextPoint.y) * .5;
    return;
  }

  /* ########################### */
  /* ####      Helpers      #### */
  /* ########################### */

  startRender(e: MouseEvent): void {
    
    this.cancelRender();
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
    this.initPoints();

    this.nextPoint = { x: e.offsetX, y: e.offsetY };

    this.render();
  }

  cancelRender(): void {

    this.ngZone.run(() => {
      cancelAnimationFrame(this.raf);
    });
    cancelAnimationFrame(this.raf);
  }

  render = (): void => {
    
    console.log('Sierpinski render');

    cptx.draw.point(this.ctx, this.nextPoint.x, this.nextPoint.y);
    this.update();

    this.raf = requestAnimationFrame(this.render);
    return;
  }
  
}
