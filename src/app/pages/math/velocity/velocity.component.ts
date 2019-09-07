
import { Component, NgZone, ViewChild, ElementRef,
  OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnChanges  } from '@angular/core';
import { CanvasPaintToolsService } from '../../../utils/canvas/tools/paint-tools.service';
import { Particle } from 'src/app/services/math/particle.service';
import { Vector } from 'src/app/services/math/vector.service';

export interface ICanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

@Component({
  selector: 'nlg-velocity',
  templateUrl: './velocity.component.html',
  styleUrls: ['./velocity.component.scss']
})
export class VelocityComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnChanges {

  @ViewChild('base', { static: true }) baseCanvas: ElementRef;
  @ViewChild('overlay', { static: true }) overlayCanvas: ElementRef;

  cbase: ICanvas;

  // Circle arrange
  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  // Center
  radius = 200;
  centerX: number;
  centerY: number;
  // Setup
  angle = 0;
  numObjects = 6;
  slice: number;
  speed: .01;
  // Point tmp
  x: number;
  y: number;

  particles: Particle[];
  numParticles = 100;

  raf: number;

  constructor(public canu: CanvasPaintToolsService, public ngZone: NgZone) { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {

    console.log('Velocity Init');

    this.initBase();

    let par = []

    for (let i = 0; i < this.numParticles; i++) {
      par.push(
        new Particle(
          this.width * .5,
          this.height / 3,
          Math.random() * 5 + 2,
          Math.random() * Math.PI * 2,
          0.1
        )
      );
    }
    this.particles = par;

    this.canvasAnimate();
  }
  ngAfterViewChecked() {    console.log('Velocity ViewChecked'); }
  ngAfterContentChecked() { console.log('Velocity ContentChecked'); }
  ngAfterContentInit() {    console.log('Velocity ContentInit'); }
  ngAfterViewInit() {       console.log('Velocity ViewInit'); }
  ngOnChanges() {           console.log('Velocity Changes'); }
  ngOnDestroy(): void {

    console.log('Velocity Destroy');
    
    this.ngZone.run(() => {
      cancelAnimationFrame(this.raf);
    });
    cancelAnimationFrame(this.raf);
  }

  /* ########################### */
  /* ####       Canvas      #### */
  /* ########################### */

  initBase = (): void => {

    this.c = this.baseCanvas.nativeElement;
    this.ctx = this.c.getContext('2d');

    this.width = this.c.width = window.innerWidth;
    this.height = this.c.height = window.innerHeight;

    this.ctx.strokeStyle = 'rgba(0, 255, 255, .9)';
    this.ctx.fillStyle = 'rgba(0, 150, 150, .8)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fill();

    this.centerX = this.width / 2;
    this.centerY = this.height;
    this.slice = Math.PI * 2 / this.numObjects;
  }

  initOverlay = (): void => {

    this.canu.grid.draw(this.ctx, this.width, this.height, 39);
    this.canu.drawCenter(this.ctx);
  }

  canvasAnimate = (): void => {
    // Prevent memory leak
    this.ngZone.runOutsideAngular(this.render);
  }

  render = (): void => {

    console.log('Velocity render');

    this.ctx.clearRect(0, 0, this.width, this.height);

    // updates
    for (let i = 0; i < this.numParticles; i++) {
      let p = this.particles[i];

      // p.accelerate(this.gravity);
      p.update();

      this.ctx.beginPath();
      this.ctx.arc(p.position.x, p.position.y, 8, 0, Math.PI * 2, false);
      this.ctx.fill();
    }

    this.raf = requestAnimationFrame(this.render);
  }

}
