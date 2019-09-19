import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import maths from 'src/app/services/math/math.service';

@Component({
  selector: 'nlg-euclid-euler',
  templateUrl: './euclid-euler.component.html',
  styleUrls: ['./euclid-euler.component.scss']
})
export class TheoremEuclidEulerComponent implements OnInit {

  @ViewChild('euclid', { static: true}) canvasRef1: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  limit = 100;
  numbers: number[] = [];

  constructor(private ngZone: NgZone) {

    for (let i = 0; i < this.limit; i++) { this.numbers.push(i); }

  }

  initEuclid() {

    for (let j = 0; j < this.limit; j++) {

      let i = j + 1;
      let r = Math.sqrt(i);
      let theta = r * 2 * Math.PI;
      let x = Math.cos(theta) * r;
      let y = -Math.sin(theta) * r;

      if (i <= this.limit) {

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

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {
    console.log('Sphere ViewChecked');
    
    this.canvas = this.canvasRef1.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "rgb(0,255,255)";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    this.initEuclid();
  }
  ngAfterViewChecked() {    console.log('Sphere ViewChecked'); }
  ngAfterContentChecked() { console.log('Sphere ContentChecked'); }
  ngAfterContentInit() {    console.log('Sphere ContentInit'); }
  ngAfterViewInit() {       console.log('Sphere ViewInit'); }
  ngOnChanges() {           console.log('Sphere Changes'); }
  ngOnDestroy() {           console.log('Sphere Destroy'); }

}
