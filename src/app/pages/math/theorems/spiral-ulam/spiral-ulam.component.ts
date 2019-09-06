import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'nlg-spiral-ulam',
  templateUrl: './spiral-ulam.component.html',
  styleUrls: ['./spiral-ulam.component.scss']
})
export class SpiralUlamComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  @ViewChild('ulam', {static: true}) canvasRef1: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  WILSON_PRIMES = [5, 13, 563];
  WIEFERICH_PRIMES = [1093, 3511];

  constructor() {
  }

  factorializeFor(num): number {
    // If num = 0 OR num = 1, the factorial will return 1
    if (num === 0 || num === 1) {
      return 1;
    }

    // We start the FOR loop with i = 4
    // We decrement i after each iteration
    for (let i = num - 1; i >= 1; i--) {
      // We store the value of num at each iteration
      num = num * i; // or num *= i;
      /*
                      num      var i = num - 1       num *= i         i--       i >= 1?
      1st iteration:   5           4 = 5 - 1         20 = 5 * 4        3          yes
      2nd iteration:  20           3 = 4 - 1         60 = 20 * 3       2          yes
      3rd iteration:  60           2 = 3 - 1        120 = 60 * 2       1          yes
      4th iteration: 120           1 = 2 - 1        120 = 120 * 1      0          no
      5th iteration: 120               0                120
      End of the FOR loop
      */
    }
    return num; // 120
  }

  /**
   * Finds the smallest factor of `n`
   *
   * @paramvalue The value to check
   * @returns
   *   The smallest prime that divides n
   *   NaN if n is NaN or Infinity
   *   0 if n is 0
   *   1 if n = 1, n = -1, or n is not an integer
   */
  leastFactor(n: number): number {
    if (n === 0) { return 0; }
    if (n % 1 || n * n < 2) { return 1; }
    if (n % 2 === 0) { return 2; }
    if (n % 3 === 0) { return 3; }
    if (n % 5 === 0) { return 5; }

    let m = Math.sqrt(n);
    for (let i = 7; i <= m; i += 30) {
      if (n % i === 0) { return i; }
      if (n % (i + 4) === 0) { return i + 4; }
      if (n % (i + 6) === 0) { return i + 6; }
      if (n % (i + 10) === 0) { return i + 10; }
      if (n % (i + 12) === 0) { return i + 12; }
      if (n % (i + 16) === 0) { return i + 16; }
      if (n % (i + 22) === 0) { return i + 22; }
      if (n % (i + 24) === 0) { return i + 24; }
    }
    return n;
  }

  /**
   * Checks if `value` is prime.
   * @param value The value to check
   * @returns Returns `true` if `value` is prime
   */
  isPrime(value: any): boolean {
    if (value % 1 || value < 2 || isNaN(value) || !isFinite(value)) {
      return false;
    }
    if (value !== this.leastFactor(value)) { return false; }
    return true;
  }
  /**
   * Creates a new primality instance.
   * @param input A number, string, or array to check the primality of.
   * @returns Returns `true` if `input` is prime.
   * @example
   *
   * primality(7);
   * // => true
   *
   * primality('13');
   * // => true
   *
   * primality([17, 19, 23]);
   * // => true
   */
  primality = function (input: number | string | any[]) {
    if (input === null || input === '') { return null; }
    if (input instanceof Array) {
      let i = input.length;
      while (i--) {
        if (!this.isPrime(input[i])) { return false; }
      }
      return true;
    }
    return this.isPrime(input);
  };


  /**
   * Configure the HTML canvas for a certain number of layers.
   * @param number numLayers The number of layers (concentric rings) in the
   *      desired spiral. Will serve as half the height and width of the
   *      canvas
   * @return (x, y) A function that intakes x- and y-coordinates and
   *      renders them at an offset equal to `numLayers` (half the height/width).
   */
  setupCanvas(numLayers: number) {
    // let sideLen = numLayers * 2 + 1;
    numLayers = this.canvas.width / 2 - 1;
    let n2 = this.canvas.height / 2 - 1;
    // this.canvas.width = sideLen;
    // this.canvas.height = sideLen;

    let context = this.canvas.getContext('2d');
    this.canvas.style.backgroundColor = '#111'
    context.fillStyle = 'aqua';

    return function drawPixel(x, y) {
      context.fillRect(x + numLayers, y + n2, 1, 1);
    };
  }
  /**
   * Functions for rendering the Ulam and Sacks spirals.
   */
  /**
   * Render an Ulam spiral on the page's canvas.
   *
   * @param numLayers The number of concentric rings, or layers, in the
   *      spiral.
   */
  ulamSpiral(numLayers: number) {
    let drawPixel = this.setupCanvas(numLayers);

    let currValue = 1;
    let x = 0;
    let y = 0;


    /**
     * Draw a line with a specified length and delta vector.
     *
     * @param dx The change in x between points.
     * @param dy The change in y between points.
     * @param len The number of points on the line.
     */
    let drawLine = (dx, dy, len) => {

      for (let pixel = 0; pixel < len; pixel++) {

        if (this. primality(currValue++)) {
          drawPixel(x, y);
        }
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
    console.log('Ulman ViewChecked');

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
