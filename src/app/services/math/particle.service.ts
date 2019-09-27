import { Vector } from './vector.service';

export class Particle {

  public gravity: Vector;
  public position: Vector;
  public velocity: Vector;

  constructor(x: number, y: number, speed: number, direction: number, gravity = 0) {

    this.gravity = new Vector(0, gravity);
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.velocity.length = speed;
    this.velocity.angle = direction;
  }

  public update() {

    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }

  public updateNoGravity() {

    this.position.addTo(this.velocity);
  }

  public accelerate(accel) {

    this.velocity.addTo(accel);
  }

}
