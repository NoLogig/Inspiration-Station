import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'nlg-drop-garden',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropNodesComponent implements OnInit {

  @ViewChild('base', { static: true }) baseCanvas: ElementRef;

  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  raf: number;
  
  metas = {
    title: 'Drop Garden',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/math/garden/drop',
      live: 'https://inspiration-station.herokuapp.com',
    }
  };


  constructor(public ngZone: NgZone) {

  }

  ngOnInit() {
    this.initCanvasBase();
  }

  ngOnDestroy(): void {
    this.ngZone.run(() => {
      cancelAnimationFrame(this.raf);
    });
    cancelAnimationFrame(this.raf);
  }

  drop() {
    let cx, cy, PI, PI_HALF, cos, sin, random, lineWidth, C,
      rings, ringsLength, data;

    // this.ctx = document.createElement('canvas').getContext('2d');
    // w = 600;
    // h = 600;
    cx = (this.width / 3);
    cy = (this.height / 2);
    rings = [];
    ringsLength = 0;

    PI = Math.PI;
    PI_HALF = PI / 2;
    cos = Math.cos;
    sin = Math.sin;
    random = Math.random;

    lineWidth = 0.2;
    C = ["#ABF8FF", "#E76B76", "#1D2439", "#4F3762", "#67F9FF", "#0C0F18"];

    data = [
      /* ring {t:total_particles, r:radius, d:distance, s:speed, c:color} */
      [
        { t: 80, r: (cx - 10), d: 40, s: 30, c: C[1] },
        { t: 60, r: (cx - 20), d: 40, s: 80, c: C[2] },
        { t: 20, r: (cx - 30), d: 20, s: 80, c: C[2] },
      ],
      [
        { t: 80, r: (cx - 80), d: 40, s: 40, c: C[4] },
        { t: 80, r: (cx - 90), d: 20, s: 40, c: C[4] },
        { t: 20, r: (cx - 100), d: 20, s: 40, c: C[2] },
        { t: 40, r: (cx - 110), d: 20, s: 40, c: C[2] },
      ],
      [
        { t: 60, r: (cx - 160), d: 40, s: 20, c: C[2] },
        { t: 20, r: (cx - 170), d: 30, s: 60, c: C[2] },
        { t: 40, r: (cx - 180), d: 40, s: 60, c: C[2] },
      ],
      [
        { t: 40, r: (cx - 230), d: 40, s: 20, c: C[5] },
        { t: 20, r: (cx - 240), d: 20, s: 10, c: C[5] },
      ],
      [
        { t: 10, r: (cx - 290), d: 10, s: 10, c: C[4] }
      ]
    ];

    // this.ctx.canvas.width = w;
    // this.ctx.canvas.height = h;
    // document.body.appendChild(this.ctx.canvas);

    data.forEach(function (group) {
      let ring = [];

      group.forEach(function (orbit, i) {
        let total_particles;

        total_particles = orbit.t;

        for (let i = 0; i < total_particles; i++) {
          let radius, distance, speed, color, opacity;

          radius = orbit.r;
          distance = orbit.d;
          speed = random() / orbit.s;
          speed = i % 2 ? speed : speed * -1;
          color = orbit.c;
          opacity = orbit.o;

          // ring.push(new P(radius, distance, speed, color, opacity));
          ring.push(new P(radius, distance, speed, color));

          radius = distance = speed = color = opacity = null;
        }
      });

      rings.push(ring);
    });

    ringsLength = rings.length;

    function P(radius, distance, speed, color) {
      this.a = PI / 180;
      this.d = distance;
      this.d2 = (this.d * this.d);
      this.x = cx + radius * cos(this.a);
      this.y = cy + radius * sin(this.a);
      this.c = color;
      this.r = (random() * 8);
      this.R = random() > 0.5 ? radius : radius - 5;
      this.s = speed;
      this.pos = random() * 360;
    }

    let draw = () => {
      let xd, yd, d, ring, ringLength, ringLength2, particle, p2;

      this.ctx.beginPath();
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.rect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "#151a28";
      this.ctx.fill();
      this.ctx.closePath();

      for (let i = 0; i < ringsLength; i++) {
        ring = rings[i];
        ringLength = ring.length;
        ringLength2 = ringLength - 100;

        for (let j = 0; j < ringLength; j++) {
          particle = ring[j];

          particle.x = cx + particle.R * sin(PI_HALF + particle.pos);
          particle.y = cy + particle.R * cos(PI_HALF + particle.pos);
          particle.pos += particle.s;

          this.ctx.beginPath();
          this.ctx.globalAlpha = 0.12;
          this.ctx.globalCompositeOperation = "lighter";
          this.ctx.fillStyle = particle.c;
          this.ctx.arc(particle.x, particle.y, particle.r, 0, PI * 2, false);
          this.ctx.fill();
          this.ctx.closePath();

          for (let k = 0; k < ringLength2; k++) {
            p2 = ring[k];

            yd = p2.y - particle.y;
            xd = p2.x - particle.x;
            d = ((xd * xd) + (yd * yd));

            if (d < particle.d2) {
              this.ctx.beginPath();
              this.ctx.globalAlpha = 1;
              this.ctx.lineWidth = lineWidth;
              this.ctx.moveTo(particle.x, particle.y);
              this.ctx.lineTo(p2.x, p2.y);
              this.ctx.strokeStyle = p2.c;
              this.ctx.stroke();
              this.ctx.closePath();
            }
          }
        }
      }
    }
  }

  /* ########################### */
  /* ####       Canvas      #### */
  /* ########################### */

  initCanvasBase = (): void => {

    this.c = this.baseCanvas.nativeElement;
    this.ctx = this.c.getContext('2d');

    this.width = this.c.width = window.innerWidth;
    this.height = this.c.height = window.innerHeight;

    this.ctx.strokeStyle = 'rgba(0, 255, 255, .9)';
    this.ctx.fillStyle = 'rgba(0, 0, 0, .8)';

  }
  canvasAnimate = (): void => {
    // Prevent memory leak
    this.ngZone.runOutsideAngular(this.render);
  }
  render = (): void => {

    // this.ctx.clearRect(0, 0, this.width, this.height);

    // updates
    this.raf = requestAnimationFrame(this.render);

  }

}
