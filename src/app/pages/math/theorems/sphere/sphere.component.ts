import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit } from '@angular/core';
import { ICirclePoint } from 'src/app/services/math/interfaces/imath';
import ctxTools from "src/app/utils/tools/paint-tools.service";

@Component({
  selector: 'nlg-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss']
})
export class SphereComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  @ViewChild('sphere', { static: true }) canvasRef: ElementRef;

  laySyntax: ICirclePoint[] = [];
  alpha = 0;
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  raf = 0;

  constructor(public ngZone: NgZone) { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {
    console.log('Sphere ViewChecked');
    
    this.initCanvas();
    this.sphereInit();
  }
  ngAfterViewChecked() {    console.log('Sphere ViewChecked'); }
  ngAfterContentChecked() { console.log('Sphere ContentChecked'); }
  ngAfterContentInit() {    console.log('Sphere ContentInit'); }
  ngAfterViewInit() {       console.log('Sphere ViewInit'); }
  ngOnChanges() {           console.log('Sphere Changes'); }
  ngOnDestroy() {

    this.ngZone.run(() => {
      cancelAnimationFrame(this.raf);
    });
    cancelAnimationFrame(this.raf);

    console.log('Sphere Destroy');
  }

  /* ########################### */
  /* ####       Canvas      #### */
  /* ########################### */

  initCanvas() {

    this.c = this.canvasRef.nativeElement;
    this.ctx = this.c.getContext("2d");

    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight;
    this.ctx.fillStyle = 'aqua';
  }

  sphereInit() {
    // Kreisbewegung
    // 100 = Radius, 125/125 = Nullpunkt
    // 0.1257 = 2*Pi/Punkteanzahl pro Kreis = 2*Pi/50
    // = Abstand der Elemente zueinander in Radiant (rad)
    // Diese Angaben bestimmen die Größe der Kreise

    let p: ICirclePoint = { x: 0, y: 0, r: 2 };
    
    for (let i = 0; i < 51; i++) {
      this.laySyntax[i] = p;
      this.laySyntax[i].x = 125 + 100 * Math.sin(0.1257 * i) + 50;
      this.laySyntax[i].y = 125 + 100 * Math.cos(0.1257 * i) + 50;

      this.ctx.fillStyle = 'aqua';
      ctxTools.draw.circle(this.ctx, p);
    }

    for (let i = 51; i < 101; i++) {
      this.laySyntax[i] = p;
      this.laySyntax[i].x = 125 + 100 * Math.sin(0.1257 * i) + 50;
      this.laySyntax[i].y = 125 + 100 * Math.cos(0.1257 * i) * Math.sin(this.alpha) + 50;

      this.ctx.fillStyle = 'lime';
      ctxTools.draw.circle(this.ctx, this.laySyntax[i]);
    }

    for (let i = 101; i < 151; i++) {
      this.laySyntax[i] = p;
      this.laySyntax[i].y = 125 + 100 * Math.cos(0.1257 * i) + 50;

      this.ctx.fillStyle = 'teal';
      ctxTools.draw.circle(this.ctx, this.laySyntax[i]);
    }

  }

  sphereMove() {

    let c: ICirclePoint = { x: 0, y: 0, r: 2 };

    for (let p = 1; p < 51; p++) {

      c.x = this.laySyntax[p].x = 125 + 100 * Math.sin(this.alpha + 0.1257 * p) + 50;
      c.y = this.laySyntax[p].y = 125 + 100 * Math.cos(this.alpha + 0.1257 * p) + 50;

      this.ctx.fillStyle = 'aqua';
      ctxTools.draw.circle(this.ctx, c);
    }

    for (let p = 51; p < 101; p++) {

      c.x = this.laySyntax[p].x = 125 + 100 * Math.cos(this.alpha + 0.1257 * p) + 50;
      c.y = this.laySyntax[p].y = 125 + 100 * Math.cos(0.1257 * p) * Math.sin(this.alpha) + 50;

      this.ctx.fillStyle = 'lime';
      ctxTools.draw.circle(this.ctx, c);
    }

    for (let p = 101; p < 151; p++) {

      c.x = this.laySyntax[p].x = 125 + 100 * Math.cos(0.1257 * p) * Math.sin(this.alpha) + 50;
      c.y = this.laySyntax[p].y = 125 + 100 * Math.cos(this.alpha + 0.1257 * p) + 50;

      this.ctx.fillStyle = 'teal';
      ctxTools.draw.circle(this.ctx, c);
    }

    // Winkel-Geschwindigkeit
    this.alpha = this.alpha - 0.01;

  }

  sphereStart() {
    // Prevent memory leak
    this.ngZone.runOutsideAngular(this.render);
  }

  render = (): void => {

    console.log('sphere render');
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    this.sphereMove();

    this.raf = requestAnimationFrame(this.render);
    return;
  }

}
