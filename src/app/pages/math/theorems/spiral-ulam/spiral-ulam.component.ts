import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';
import maths from 'src/app/services/math/math.service';

@Component({
  selector: 'nlg-spiral-ulam',
  templateUrl: './spiral-ulam.component.html',
  styleUrls: ['./spiral-ulam.component.scss']
})
export class SpiralUlamComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  @ViewChild('ulam', {static: true}) canvasRef1: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() { }

  /** Configure the HTML canvas for a certain number of layers.
   * @param number numLayers The number of layers (concentric rings) in the
   *      desired spiral. Will serve as half the height and width of the
   *      canvas
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

    return  (x, y) => {
      this.ctx.fillRect(x + numLayers, y + n2, 1, 1);
    };
  }
  
  /** Render an Ulam spiral on the canvas.
   * @param numLayers The number of concentric rings, or layers, in the spiral.
   */
  ulamSpiral(numLayers: number) {

    let drawPixel = this.setupCanvas(numLayers);

    let currValue = 1;
    let x = 0;
    let y = 0;

    /** Draw a line with a specified length and delta vector.
     * @param dx The change in x between points.
     * @param dy The change in y between points.
     * @param len The number of points on the line.
     */
    let drawLine = (dx, dy, len) => {

      for (let pixel = 0; pixel < len; pixel++) {

        if ( maths.prime.primality(currValue++)) { drawPixel(x, y); }
        x += dx;
        y += dy;
      }
    };

    for (let layer = 0, len = 0; layer <= numLayers; layer++ , len += 2) {

      drawLine(0, -1, len - 1);
      drawLine(-1, 0, len);
      drawLine(0, 1, len);
      drawLine(1, 0, len + 1);
    }

  }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {
    console.log('Ulman Init');

    this.canvas = this.canvasRef1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ulamSpiral(1000);
  }
  ngAfterViewChecked() {    console.log('Ulman ViewChecked'); }
  ngAfterContentChecked() { console.log('Ulman ContentChecked'); }
  ngAfterContentInit() {    console.log('Ulman ContentInit'); }
  ngAfterViewInit() {       console.log('Ulman ViewInit'); }
  ngOnChanges() {           console.log('Ulman Changes'); }
  ngOnDestroy() {           console.log('Ulman Destroy'); }

}
