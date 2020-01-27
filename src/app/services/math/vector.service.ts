import { IPoint } from './interfaces/imath';

export class Vector {

  public x = 1;
  public y = 0;
  public ang: number;
  public len: number;

  public get angle(): number { return Math.atan2(this.y, this.x); }
  public set angle(val: number) {

    this.ang = val;    
    this.x = Math.cos(val) * this.len;
    this.y = Math.sin(val) * this.len;
  }

  public get length(): number { return Math.sqrt(this.x ** 2 + this.y ** 2); }
  public set length(val: number) {

    this.len = val;  
    this.x = Math.cos(this.ang) * val;
    this.y = Math.sin(this.ang) * val;
  }

  constructor(x: number, y: number) {

    this.x = x;
    this.y = y;
    this.ang = this.angle;
    this.len = this.length;
  }

  public addTo(vect: IPoint) {

    this.x += vect.x;
    this.y += vect.y;
  }
  
  public subtractFrom(vect: IPoint) {

    this.x -= vect.x;
    this.y -= vect.y;
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
