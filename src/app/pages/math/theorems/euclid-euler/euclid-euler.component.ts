import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import maths from 'src/app/services/math/math.service';

@Component({
  selector: 'nlg-euclid-euler',
  templateUrl: './euclid-euler.component.html',
  styleUrls: ['./euclid-euler.component.css']
})
export class TheoremEuclidEulerComponent implements OnInit {

  @ViewChild('ulman', { static: true}) canvasRef1: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  n = 100;
  nA = [];

  constructor() {

    for (let i = 0; i < this.n; i++) { this.nA.push(i); }

  }

  ngOnInit() {

    this.canvas = this.canvasRef1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "rgb(0,255,255)";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    for (let j = 0; j < this.n; j++) {

      let i = j + 1;
      let r = Math.sqrt(i);
      let theta = r * 2 * Math.PI;
      let x = Math.cos(theta) * r;
      let y = -Math.sin(theta) * r;

      if (i <= this.n) {

        let factors = maths.factorial.factors(i);

        if (factors.length > 1) {

          let radius = 0.05 * Math.pow(2, factors.length - 1);

          this.ctx.beginPath();
          this.ctx.arc(x , y, radius, 0, Math.PI * 2);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }

    }

  }

}
