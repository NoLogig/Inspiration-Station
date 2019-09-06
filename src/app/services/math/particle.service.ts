import { Vector } from './vector.service';

export class Particle {

  public position: Vector;
  public velocity: Vector;
  public gravity: Vector;

  constructor(x: number, y: number, speed: number, direction: number, gravity: number) {

    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.velocity.length = speed;
    this.velocity.angle = direction;

    this.gravity = new Vector(0, gravity);
  }

  public update() {

    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }

  public accelerate(accel) {

    this.velocity.addTo(accel);
  }

}
