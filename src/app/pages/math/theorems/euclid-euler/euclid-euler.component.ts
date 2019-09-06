import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, range } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'nlg-euclid-euler',
  templateUrl: './euclid-euler.component.html',
  styleUrls: ['./euclid-euler.component.css']
})
export class TheoremEuclidEulerComponent implements OnInit {


  @ViewChild('ulman', { static: true}) canvasRef1: ElementRef;

  n = 100;
  nA = [];

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  counter$: Observable<number>;
  factorial$: Observable<number>;
  subscription;

  constructor() {

    this.counter$ = range(1, 10);
    this.factorial$ = this.counter$.pipe(
      scan((acc, value) => acc * value));

    this.subscription = this.factorial$.subscribe(
      function (x) {
        console.log('Next: ' + x);
      },
      function (err) {
        console.log('Error: ' + err);
      },
      function () {
        console.log('Completed');
      });

    for (let i = 0; i < this.n; i++) {
      this.nA.push(i);
    }

  }

  // Rekursive
  euklid1(a, b) {
    if (b === 0) {
      return a;
    }
    if (a === 0) {
      return b;
    }
    if (a > b) {
      return this.euklid1(a - b, b);
    }
    return this.euklid1(a, b - a);
  }

  // Iterative
  euklid2(a, b) {
    if (a === 0) {
      return b;
    }

    while (b !== 0) {
      if (a > b) {
        a -= b;
        continue;
      }
      b -= a;
    }

    return a;
  }

  // Modern Variantions

  // Rekursive
  euklid3(a, b) {
    if (b === 0) {
      return a;
    }

    return this.euklid3(b, a % b);
  }

  // Iterative
  euklid4(a, b) {
    let tmp = 0;
    while (b !== 0) {
      tmp = a % b;
      a = b;
      b = tmp;
    }
    return a;
  }

  ngOnInit() {

    this.canvas = this.canvasRef1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    for (let j = 0; j < this.n; j++) {
      let i = j + 1;
      let r = Math.sqrt(i);
      let theta = r * 2 * Math.PI;
      let x = Math.cos(theta) * r;
      let y = -Math.sin(theta) * r;

      if (i <= this.n) {

        let factors = this.factors(i);

        if (factors.length > 1) {

          let radius = 0.05 * Math.pow(2, factors.length - 1);

          this.ctx.beginPath();
          this.ctx.arc(x, y, radius, 0, Math.PI);
          this.ctx.fill();
        }
      }
    }
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
// Monadic bind (chain) for lists
 chain(xs, f): [] {
  return [].concat.apply([], xs.map(f));
}

// [m..n]
 range(m, n): [] {
  return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
    return m + i;
  });
}

factors(n): [] {
  return this.chain( this.range(1, n), function (x) {       // monadic chain/bind
    return n % x ? [] : [x];                                // monadic fail or inject/return
  });
}

}
