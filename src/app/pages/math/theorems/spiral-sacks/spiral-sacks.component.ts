import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';
import maths from 'src/app/services/math/math.service';

@Component({
  selector: 'nlg-spiral-sacks',
  templateUrl: './spiral-sacks.component.html',
  styleUrls: ['./spiral-sacks.component.scss']
})
export class SpiralSacksComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  @ViewChild('sacks', {static: true}) canvasRef1: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() { }

  /** Configure the HTML canvas for a certain number of layers.
   * @param number numLayers The number of layers (concentric rings) in the
   *      desired spiral. Will serve as half the height and width of the canvas
   * @return (x, y) A function that intakes x- and y-coordinates and
   *      renders them at an offset equal to `numLayers` (half the height/width).
   */
  setupCanvas(numLayers: number) {

    numLayers = this.canvas.width / 2 - 1;
    let n2 = this.canvas.height / 2 - 1;
    // let sideLen = numLayers * 2 + 1;
    // this.canvas.width = sideLen;
    // this.canvas.height = sideLen;

    this.canvas.style.backgroundColor = '#111'
    this.ctx.fillStyle = 'aqua';

    return (x, y) => {
      this.ctx.fillRect(x + numLayers, y + n2, 1, 1);
    };
  }

  /** Render a Sacks spiral on the page's canvas.
   * @param numLayers The number of squared values along the Sacks spiral's "axis."
   */
  sacksSpiral(numLayers: number) {

    let drawPixel = this.setupCanvas(numLayers);
    let currValue = 1;

    for (let layer = 1; layer <= numLayers; layer++) {

      let numPoints = 2 * layer + 1;
      let angle = 2 * Math.PI / numPoints;

      for (let point = 1; point <= numPoints; point++) {

        if (maths.prime.primality(currValue++)) {

          let theta = point * angle;
          let radius = layer + point / numPoints;
          let x = Math.cos(theta) * radius;
          let y = Math.sin(theta) * radius;

          drawPixel(Math.floor(x), Math.floor(y));
        }

      }

    }

  }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {
    console.log('Sacks Init');

    this.canvas = this.canvasRef1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.sacksSpiral(1000);
  }
  ngAfterViewChecked() {    console.log('Sacks ViewChecked'); }
  ngAfterContentChecked() { console.log('Sacks ContentChecked'); }
  ngAfterContentInit() {    console.log('Sacks ContentInit'); }
  ngAfterViewInit() {       console.log('Sacks ViewInit'); }
  ngOnChanges() {           console.log('Sacks Changes'); }
  ngOnDestroy() {           console.log('Sacks Destroy'); }

}
