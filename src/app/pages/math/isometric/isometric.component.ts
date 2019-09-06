import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'nlg-isometric',
  templateUrl: './isometric.component.html',
  styleUrls: ['./isometric.component.scss']
})
export class IsometricComponent implements OnInit {

  @ViewChild('base', { static: true }) canvasBase: ElementRef;
  @ViewChild('char', { static: true }) canvasChar: ElementRef;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  charCanvas: HTMLCanvasElement;
  charCtx: CanvasRenderingContext2D;
  width: number;
  height: number;

  img: HTMLImageElement;
  imgData: CanvasImageSource;
  tileWidth = 56.2;
  tileHeight = 25;

  charImg: HTMLImageElement;
  charImgData: CanvasImageSource;
	charX = 0.5;
  charY = 9.5;
  
  grid = [
		[15, 15, 15, 14, 13, 10, 3, 2, 1, 0],
		[15, 15, 14, 13, 10, 10, 3, 2, 1, 0],
		[15, 14, 13, 10, 10, 3, 3, 2, 1, 0],
		[14, 13, 10, 9, 3, 3, 2, 1, 0, 0],
		[13, 10, 9, 7, 3, 2, 1, 0, 0, 0],
		[10, 9, 7, 6, 3, 2, 1, 0, 0, 0],
		[9, 7, 6, 5, 3, 2, 1, 1, 1, 1],
		[7, 6, 5, 3, 3, 2, 2, 2, 2, 2],
		[6, 5, 5, 3, 3, 3, 3, 3, 3, 3],
		[5, 5, 5, 5, 5, 5, 5, 5, 5, 3]
  ];
  
  constructor(public ngZone: NgZone) {

    this.img = document.createElement("img");
    this.img.src = "./assets/images/tiles/tileset.png";
    this.charImg = document.createElement("img");
    this.charImg.src = "./assets/images/tiles/ball.png"
  }

  /** Ng Lifecycle hooks */
  ngOnInit(): void {

    this.canvas = this.canvasBase.nativeElement;
    this.ctx = this.canvasBase.nativeElement.getContext('2d');
    this.charCanvas = this.canvasChar.nativeElement;
    this.charCtx = this.canvasChar.nativeElement.getContext('2d');

    this.width = this.canvas.width = this.charCanvas.width = window.innerWidth;
    this.height = this.canvas.height = this.charCanvas.height = window.innerHeight;

    this.ctx.strokeStyle = 'rgba(0, 255, 255, .9)';
    this.ctx.fillStyle = 'rgba(0, 0, 0, .8)';

    this.ctx.translate(this.width / 2, 56);
    // Char
    this.charCtx.translate(this.width / 2, 56);

    // document.body.addEventListener("keydown", this.moveCharacter);
        
    /* Prevent cd memory leak */
    // this.ngZone.runOutsideAngular(this.render);
  }

  /** Renders & Frames */
  render = (): void => {

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Updates

    requestAnimationFrame(this.render);
  }

  drawer() {

    for (let x = 0; x < 25; x++) {
      for (let y = 0; y < 25; y++) {

        // this.drawImageTile(x, y, Math.floor(Math.random() * 16));
        this.drawBlock(x, y, Math.random() * 4, ); //this.randomColor());
      }
    }
  }

  randomColor(): string {

    let r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);
        
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  drawTile(x: number, y: number, color: string, ctx?: CanvasRenderingContext2D) {

    this.ctx.save();
    this.ctx.translate((x - y) * this.tileWidth / 2, (x + y) * this.tileHeight / 2);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.tileWidth / 2, this.tileHeight / 2);
    this.ctx.lineTo(0, this.tileHeight);
    this.ctx.lineTo(-this.tileWidth / 2, this.tileHeight / 2);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.restore();
  }

  drawBlock(x: number, y: number, z: number, ctx?: CanvasRenderingContext2D) {

    /* 
        for (let x = 0; x < 30; x++) {
          for (let y = 0; y < 30; y++) {
            let dx = 15 - x,
              dy = 15 - y,
              dist = Math.sqrt(dx * dx + dy * dy),
              z = Math.cos(dist * 0.75) * 2 + 2;
            this.drawBlock(x, y, z);
          }
        }
    */
    let top = "#eeeeee",
        right = "#cccccc",
        left = "#999999";

    this.ctx.save();
    this.ctx.translate((x - y) * this.tileWidth / 2, (x + y) * this.tileHeight / 2);

    // draw top
    this.ctx.beginPath();
    this.ctx.moveTo(0, -z * this.tileHeight);
    this.ctx.lineTo(this.tileWidth / 2, this.tileHeight / 2 - z * this.tileHeight);
    this.ctx.lineTo(0, this.tileHeight - z * this.tileHeight);
    this.ctx.lineTo(-this.tileWidth / 2, this.tileHeight / 2 - z * this.tileHeight);
    this.ctx.closePath();
    this.ctx.fillStyle = top;
    this.ctx.fill();

    // draw left
    this.ctx.beginPath();
    this.ctx.moveTo(-this.tileWidth / 2, this.tileHeight / 2 - z * this.tileHeight);
    this.ctx.lineTo(0, this.tileHeight - z * this.tileHeight);
    this.ctx.lineTo(0, this.tileHeight);
    this.ctx.lineTo(-this.tileWidth / 2, this.tileHeight / 2);
    this.ctx.closePath();
    this.ctx.fillStyle = left;
    this.ctx.fill();

    // draw right
    this.ctx.beginPath();
    this.ctx.moveTo(this.tileWidth / 2, this.tileHeight / 2 - z * this.tileHeight);
    this.ctx.lineTo(0, this.tileHeight - z * this.tileHeight);
    this.ctx.lineTo(0, this.tileHeight);
    this.ctx.lineTo(this.tileWidth / 2, this.tileHeight / 2);
    this.ctx.closePath();
    this.ctx.fillStyle = right;
    this.ctx.fill();

    this.ctx.restore();
  }

  drawImageTile(x: number, y: number, index: number, ctx?: CanvasRenderingContext2D) {

		this.ctx.save();
    this.ctx.translate((x - y) * this.tileWidth / 2,
                       (x + y) * this.tileHeight / 2 + (index < 4 ? 5 : 0));  

		this.ctx.drawImage(this.img, index * this.tileWidth, 0, this.tileWidth, this.img.height,
			                -this.tileWidth / 2, 0, this.tileWidth, this.img.height);
		
		this.ctx.restore();
  }
  
  /* Char */
  drawCharacter(image: HTMLImageElement, x: number, y: number) {

		this.charCtx.clearRect(-this.width / 2, -50, this.width, this.height);
		this.charCtx.save();
		this.charCtx.translate((x - y) * this.tileWidth / 2, (x + y) * this.tileHeight / 2);  

		this.charCtx.drawImage(image, -image.width / 2, -image.height);

		this.charCtx.restore();		
	}

	moveCharacter = (event: KeyboardEvent) => {
    event.preventDefault();
    console.log(event);
		switch(event.keyCode) {
			case 37: // left
				if(this.canMove(this.charX - 1, this.charY)) {
					this.charX--;
					this.drawCharacter(this.charImg, this.charX, this.charY);
				}
				break;
			case 38: // up
				if(this.canMove(this.charX, this.charY - 1)) {
					this.charY--;
					this.drawCharacter(this.charImg, this.charX, this.charY);
				}
				break;
			case 39: // right
				if(this.canMove(this.charX + 1, this.charY)) {
					this.charX++;
					this.drawCharacter(this.charImg, this.charX, this.charY);
				}
				break;
			case 40: // down
				if(this.canMove(this.charX, this.charY + 1)) {
					this.charY++;
					this.drawCharacter(this.charImg, this.charX, this.charY);
				}
				break;

		}
	}

	canMove(x: number, y: number) {

		x = Math.floor(x);
		y = Math.floor(y);
		if(y < 0 || y >= this.grid.length) {
			return false;
		}
		if(x < 0 || x >= this.grid[y].length) {
			return false;
		}
		let tile = this.grid[y][x];
		if(tile < 3 || tile > 14) {
			return false;
		}
		return true;
	}

	drawMap() {


		for(let y = 0; y < this.grid.length; y++) {
			let row = this.grid[y];
			for(let x = 0; x < row.length; x++) {
				this.drawImageTile(x, y, row[x]);
			}
    }
    this.drawCharacter(this.charImg, this.charX, this.charY);
  }
  
}
