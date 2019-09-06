import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

interface IShape {
  index: number;
  col: number;
  row: number;
  x: number;
  y: number;
  color: string;
  connected: boolean;
}

@Component({
  selector: 'nlg-checkboard',
  templateUrl: './checkboard.component.html',
  styleUrls: ['./checkboard.component.scss']
})
export class CheckboardComponent implements OnInit {

  @ViewChild('checkBoard', { static: true }) canvasBoard: ElementRef;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private size = 50;
  private shapes: IShape[] = [];
  private iterator: IterableIterator<IShape[]>;
  private currentColor: string;

  public colors = [];
  public rows: number;
  public selectedColor: string;

  constructor() { }

  ngOnInit() {

    this.canvas = this.canvasBoard.nativeElement;
    this.ctx = this.canvasBoard.nativeElement.getContext('2d');
  }

  createBoard(rows: number) {

    this.canvas.width = (this.size * rows);
    this.canvas.height = (this.size * rows);

    this.rows = rows * 1;

    this.createShapes();
  }

  createShapes() {

    for (let row = 0, tempY = 0; row <= this.rows - 1; row++ , tempY += 50) {

      for (let column = 0, index = 0, tempX = 0; column <= this.rows - 1; column++ , tempX += 50) {

        let colorIndex: number = Math.floor(Math.random() * this.colors.length);

        let tempShape: IShape = {
          col: column,
          row,
          index: index++,
          x: tempX,
          y: tempY,
          color: this.colors[colorIndex],
          connected: false
        };

        this.shapes.push(tempShape);
      }
    }

    console.log('Shapes Created %o', this.shapes);

    this.selectedColor = this.currentColor = this.shapes[0].color;
    this.shapes[0].connected = true;
    this.iterator = this.compareGenerator(this.shapes[0]);

    console.log('Init Shapes Generator %o', this.iterator);

    this.drawShapes(this.shapes);
  }

  drawShapes(shapes: IShape[]): void {
    // this.clearCanvas();
    shapes.forEach((shape) => {
      this.ctx.fillStyle = shape.color;
      this.ctx.fillRect(shape.x, shape.y, this.size, this.size);
    });
    return;
  }

  getShapeValue(row: number, col: number): IShape {
    return this.shapes[row * this.rows + col];
  }

  setShapeValue(row: number, col: number, value: string | IShape) {

    if (typeof value === 'string') {
      this.shapes[row * this.rows + col].color = value;
      return;
    }
    this.shapes[row * this.rows + col] = value;
  }

  playerMove(color: string) {

    this.selectedColor = this.currentColor = color;

    this.compareShapes();
    this.setShapesColors(color);
    this.drawShapes(this.shapes);
  }

  iterateConnected(shape) {

    let test;
    this.iterator = this.compareGenerator(shape);

    do {
      test = this.iterator.next();
    } while (test.value[0] !== undefined || test.value[1] !== undefined || test.value[2] !== undefined || test.value[3] !== undefined);
  }

  *compareGenerator(shape: IShape): IterableIterator<IShape[]> {

    let [shapeB, shapeR, shapeT, shapeL] = [shape, shape, shape, shape];

    do {
      let [sameB, sameR] = [this.compareBottom(shapeB), this.compareRight(shapeR)],
        [sameT, sameL] = [this.compareTop(shapeT), this.compareLeft(shapeL)];

      if (sameB) { shapeB = sameB; }
      if (sameR) { shapeR = sameR; }
      if (sameL) { shapeL = sameL; }
      if (sameT) { shapeT = sameT; }

      yield [sameB, sameR, sameT, sameL];
    } while (shapeB !== undefined && shapeR !== undefined);
  }

  compareShapes() {
    // this.shapes[row * this.rows + col];

    this.shapes.forEach(s => {
      if (s.connected) {
        this.iterateConnected(s);
      }
    });
  }

  compareRight(shape: IShape) {

    if (shape.col === this.rows - 1) { return; }

    let compareShape = this.getShapeValue(shape.row, shape.col + 1);

    if (shape.color === compareShape.color) {
      shape.connected = true;
      compareShape.connected = true;
      return compareShape;
    }
    return;
  }

  compareLeft(shape: IShape) {

    if (shape.col === 0) { return; }

    let compareShape = this.getShapeValue(shape.row, shape.col - 1);

    if (shape.color === compareShape.color) {
      shape.connected = true;
      compareShape.connected = true;
      return compareShape;
    }
    return;
  }

  compareTop(shape: IShape) {

    if (shape.row === 0) { return; }

    let compareShape = this.getShapeValue(shape.row - 1, shape.col);

    if (shape.color === compareShape.color) {
      shape.connected = true;
      compareShape.connected = true;
      return compareShape;
    }
    return;
  }

  compareBottom(shape: IShape) {

    if (shape.row === this.rows - 1) { return; }

    let compareShape = this.getShapeValue(shape.row + 1, shape.col);

    if (shape.color === compareShape.color) {
      shape.connected = true;
      compareShape.connected = true;
      return compareShape;
    }
    return;
  }

  addColor(color) {
    this.colors.push(color);
  }

  setShapesColors(color: string) {

    this.shapes.forEach(shape => {
      if (shape.connected === true) { shape.color = this.selectedColor; }
    });
  }

  clearCanvas(reset?: boolean): void {

    if (reset) {
      this.canvas.width = this.canvas.width;
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return;
  }

}
