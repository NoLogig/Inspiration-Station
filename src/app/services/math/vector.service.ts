import { IPoint } from './interfaces/imath';

export class Vector {

  public x = 1;
  public y = 0;
  public ang: number;
  public len: number;

  public get angle(): number { return Math.atan2(this.y, this.x); }
  public set angle(a: number) {

    this.ang = a;    
    this.x = Math.cos(a) * this.len;
    this.y = Math.sin(a) * this.len;
  }

  public get length(): number { return Math.sqrt(this.x ** 2 + this.y ** 2); }
  public set length(l: number) {

    this.len = l;  
    this.x = Math.cos(this.ang) * l;
    this.y = Math.sin(this.ang) * l;
  }

  constructor(x: number, y: number) {

    this.x = x;
    this.y = y;
    this.ang = this.angle;
    this.len = this.length;
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
