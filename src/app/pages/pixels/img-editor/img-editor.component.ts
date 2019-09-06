import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nlg-img-editor',
  templateUrl: './img-editor.component.html'
})
export class ImageEditorComponent implements OnInit {

  @ViewChild('can1', { static: true}) canvas1: ElementRef;

  @ViewChild('can2', { static: true}) canvas2: ElementRef;
  @ViewChild('img', { static: true}) myImg: ElementRef;

  public c1: HTMLCanvasElement;
  public ctx1: CanvasRenderingContext2D;
  public c2: HTMLCanvasElement;
  public ctx2: CanvasRenderingContext2D;
  width;
  height;
  arrowX;
  arrowY;
  dx; dy;
  angle = 0;
  img: HTMLImageElement;

  constructor() {
   }

  ngOnInit() {
    this.c1 = this.canvas1.nativeElement;
    this.ctx1 = this.c1.getContext('2d');
    this.c2 = this.canvas2.nativeElement;
    this.ctx2 = this.c2.getContext('2d');

    this.img = this.myImg.nativeElement;
    this.img.src =  './assets/imgs/bf4PlayerActive.png';

    // this.width = this.c1.width  = window.innerWidth / 2;
    // this.height = this.c1.height = window.innerHeight / 2;
    // this.img.style.display = "none";
    // this.c1.style.display = "none";
    // this.c2.style.display = "none";
  }
  initCanvas() {
  }
  computeFrame() {
    this.width = this.c1.width  = this.img.width;
    this.height = this.c1.height = this.img.height;
    this.ctx1.drawImage(this.img, 0, 0 );
    let frame = this.ctx1.getImageData(0, 0, this.c1.width, this.c1.height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      frame.data[i * 4 + 0] = 0;
       frame.data[i * 4 + 1] = 0;
       frame.data[i * 4 + 2] = 250;

      // if (g > 150 && r < 40 && b < 43) {
      //   frame.data[i * 4 + 3] = 0;
      // }

    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }
}
