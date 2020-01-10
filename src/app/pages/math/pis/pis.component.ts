import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, AfterContentInit } from '@angular/core';
import { utils } from "src/app/services/math/math.service";

export interface ICard {
  x: number,
  y: number,
  z: number,
  img: HTMLImageElement
}

@Component({
  selector: 'nlg-pis',
  templateUrl: './pis.component.html',
  styleUrls: ['./pis.component.scss']
})

export class PISComponent implements OnInit {

  @ViewChild('base', { static: true }) canvasBase: ElementRef;

  // Business-Card
  metas = {
    title: 'Postcards in Space',
    subTitle: '2.5D',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/math/pis',
      live: 'https://inspiration-station.herokuapp.com/pis',
    }
  };


  // Variables
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  raf: number;

  // Shapes
  numShapes = 100;
  shape = {
    x: 500,
    y: 300,
    z: 200,
    char: ""
  }
  shapes = [];
  
  // Cards
  numCards = 21;
  card: ICard = {
    x: 500,
    y: 300,
    z: 500,
    img: document.createElement('img')
  };
  cards: ICard[] = [];

  // Bubbles
  bubble: {
      x: number,
      y: number,
			z: number,
			angle: number,
			radius: number
  };
  bubbles = [];
  numBubbles = 200;

  // Perspective
  fl = 300;
  perspective = this.fl / (this.fl + this.shape.z);

  // Z-Cicles
  centerZ = 800;
  radius = 1000;
  baseAngle = 0;
  rotationSpeed = 0.01;

  constructor(public ngZone: NgZone) { }

  /** Ng Lifecycle hooks */
  ngOnInit(): void {

    this.canvas = this.canvasBase.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    this.canvas.addEventListener("resize", this.resizeCanvas);
    // this.canvas.addEventListener("mousemove", (event) => {
    //   this.rotationSpeed = (event.clientX - this.width / 2) * 0.00005;
    //   this.ypos = (event.clientY - this.height / 2) * 2;
    // });

    this.ctx.strokeStyle = 'rgba(0, 255, 255, .9)';
    this.ctx.fillStyle = 'rgba(0, 0, 0, .8)';
    this.ctx.font = "200px Arial";

    // this.initPerspective();
    this.initShapes();
    this.initCards();
    this.initBubbles();

    /* Prevent cd memory leak */
    // this.ngZone.runOutsideAngular(this.render);
  }

  initPerspective() {

    this.ctx.translate(this.width / 2, this.height / 2);

  }

  initCards() {

    for (let i = 0; i < this.numCards; i++) {

      this.cards[i] = {
        x: utils.randomRange(-1000, 1000),
        y: utils.randomRange(-1000, 1000),
        z: utils.randomRange(0, 5000),
        img: document.createElement('img')
      };

      this.cards[i].img.src =  "../../../../assets/images/postcard" + (i % 7 ) + ".jpg";
    }

  }

  initShapes() {

    for (let i = 0; i < this.numShapes; i++) {

      this.shapes[i] = {
        x: utils.randomRange(-1000, 1000),
        y: utils.randomRange(-1000, 1000),
        z: utils.randomRange(0, 5000),
        char: String.fromCharCode(utils.randomRange(65, 91))
      };
    }

  }

  initBubbles() {

    for (let i = 0; i < this.numBubbles; i++) {

      this.bubbles[i] = {
        angle: utils.randomRange(0, Math.PI * 2),
        radius: utils.randomRange(100, 1100),
        y: utils.randomRange(2000, -2000),
      };
      this.bubbles[i].x = Math.cos(this.bubbles[i].angle + this.baseAngle) * this.bubbles[i].radius;
      this.bubbles[i].z = this.centerZ + Math.sin(this.bubbles[i].angle + this.baseAngle) * this.bubbles[i].radius;
  
    }


    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.fillStyle = "white";
  }

  /** Updates & Frames */

  updateShapes() {

    for (let i = 0; i < this.numShapes; i++) {

      let tmpShape = this.shapes[i];
      let perspective = this.fl / (this.fl + tmpShape.z);

      this.ctx.save();
      this.ctx.translate(tmpShape.x * perspective, tmpShape.y * perspective);
      this.ctx.scale(perspective, perspective);

      // square
      this.ctx.fillRect(tmpShape.x, tmpShape.y, 200, 200);

      // circle
      // this.ctx.beginPath();
      // this.ctx.arc(tmpShape.x, tmpShape.y, 100, 0, Math.PI * 2, false);
      // this.ctx.fill();

      // letter
      this.ctx.fillText(tmpShape.char, -100, -100);

      this.ctx.restore();

      // move away
      // tmpShape.z += 5;
      // if (tmpShape.z > 5000) { tmpShape.z = 0; }

      // move toward
      tmpShape.z -= 5;
      if (tmpShape.z < 0) { tmpShape.z = 5000; }

    }

  }

  updateCards() {

    for (let i = 0; i < this.numCards; i += 1) {

      let card = this.cards[i],
          perspective = this.fl / (this.fl + card.z);

      this.ctx.save();
      this.ctx.translate(card.x * perspective, card.y * perspective);
      this.ctx.scale(perspective, perspective);

      this.ctx.translate(-card.img.width / 2, -card.img.height / 2);
      this.ctx.drawImage(card.img, 0, 0);
      this.ctx.fillRect(card.x, card.y, 200, 200);

      this.ctx.restore();

      card.z -= 5;
      if (card.z < 0) { card.z = 5000; }

    }

  }

  updateBubbles() {

		this.baseAngle += this.rotationSpeed;
		this.bubbles.sort(this.zsort);
    this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
    
		for(let i = 0; i < this.numBubbles; i += 1) {

			let bubble = this.bubbles[i],
			  	perspective = this.fl / (this.fl + bubble.z);

			this.ctx.save();
			this.ctx.scale(perspective, perspective);
			this.ctx.translate(bubble.x, bubble.y);
			this.ctx.globalAlpha = utils.map(bubble.y, 2000, -2000, 1, 0);

			this.ctx.beginPath();
			this.ctx.arc(0, 0, 40, 0, Math.PI * 2, false);
			this.ctx.fill();

			this.ctx.restore();

			bubble.x = Math.cos(bubble.angle + this.baseAngle) * bubble.radius;
			bubble.z = this.centerZ + Math.sin(bubble.angle + this.baseAngle) * bubble.radius;
			bubble.y -= 10;

			if(bubble.y < -2000) { bubble.y = 2000; }
		}
	}
  /** Renders & Helpers */

  zsort(cardA: ICard, cardB: ICard) {
  
    return cardB.z - cardA.z;
  }
  
  startCards() {
    
    this.ngZone.runOutsideAngular(this.renderCards);
  }

  startBubbles() {
    
    this.ngZone.runOutsideAngular(this.renderBubbles);
  }
  
  startShapes() {
    
    this.ngZone.runOutsideAngular(this.renderShapes);
  }

  renderCards = (): void => {

    this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Updates
    this.updateCards();

    this.raf = requestAnimationFrame(this.renderCards);

  }

  renderShapes = (): void => {

    this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Updates
    this.updateShapes();

    this.raf = requestAnimationFrame(this.renderShapes);

  }

  renderBubbles = (): void => {

    this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Updates
    this.updateBubbles();

    this.raf = requestAnimationFrame(this.renderBubbles);

  }

  stopAnimations(raf: number) {

    this.ngZone.run(() => {
      
      cancelAnimationFrame(raf);
    });

  }

  resizeCanvas = () => {

    // if (!size) {

      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      return;
    // }

    // this.width = this.canvas.width = size.width;
    // this.height = this.canvas.height = size.height;

  }

}
