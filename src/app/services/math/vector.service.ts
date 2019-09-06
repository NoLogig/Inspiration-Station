import { IPoint } from './interfaces/imath';

export class Vector {

  public x = 1;
  public y = 0;
  public a: number;
  public l: number;

  public get angle(): number { return Math.atan2(this.y, this.x); }
  public set angle(a: number) {
    this.a = a;    
    this.x = Math.cos(a) * this.l;
    this.y = Math.sin(a) * this.l;
  }

  public get length(): number { return Math.sqrt(this.x ** 2 + this.y ** 2); }
  public set length(l: number) {
    this.l = l;  
    this.x = Math.cos(this.a) * l;
    this.y = Math.sin(this.a) * l;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.a = this.angle;
    this.l = this.length;
  }

  public addTo(v: IPoint) {
    this.x += v.x;
    this.y += v.y;
  }
  public subtractFrom(v: IPoint) {
    this.x -= v.x;
    this.y -= v.y;
  }
  public multiplyBy(n: number) {
    this.x *= n;
    this.y *= n;
  }
  public divideBy(n: number) {
    this.x /= n;
    this.y /= n;
  }

}