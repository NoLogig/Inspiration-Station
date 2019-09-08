import { 
  Component,ViewChild, ElementRef, NgZone,
  OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnChanges 
} from '@angular/core';
import { ICircleParticle, IPoint } from 'src/app/services/math/interfaces/imath';
import maths from 'src/app/services/math/math.service';

@Component({
  selector: 'nlg-node-garden',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeGardenComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnChanges {

  @ViewChild('nodeGarden', { static: true }) canvasNodeGarden: ElementRef;

  c: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cWidth: number;
  cHeight: number;

  nodeCounter: number;
  nodes: ICircleParticle[];
  connectRange: number;

  raf: number;

  metas = {
    title: 'Node Garden',
    subTitle: 'Iteration / Array Performance & Math Operator Optimation',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/math/garden/node',
      live: 'https://inspiration-station.herokuapp.com/node-garden',
    }
  };

  constructor(public ngZone: NgZone) { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {

    console.log('NodeGarden Init');

    this.initCanvas();
    this.initConfigs();

    // Prevent memory leak
    this.ngZone.runOutsideAngular(this.render);
  }
  ngAfterViewChecked() {    console.log('NodeGarden ViewChecked'); }
  ngAfterContentChecked() { console.log('NodeGarden ContentChecked'); }
  ngAfterContentInit() {    console.log('NodeGarden ContentInit'); }
  ngAfterViewInit() {       console.log('NodeGarden ViewInit'); }
  ngOnChanges() {           console.log('NodeGarden Changes'); }
  ngOnDestroy(): void {

    this.ngZone.run(() => {
      cancelAnimationFrame(this.raf);
    });
    cancelAnimationFrame(this.raf);

    console.log('NodeGarden Destroy');
  }

  /* ########################### */
  /* ####       Canvas      #### */
  /* ########################### */

  initCanvas() {

    this.c = this.canvasNodeGarden.nativeElement;
    this.ctx = this.c.getContext('2d');

    // resizeCanvas() { }
    this.cWidth = this.c.width = window.innerWidth;
    this.cHeight = this.c.height = window.innerHeight;

    this.ctx.strokeStyle = 'rgba(0, 255, 255, .9)';
    this.ctx.fillStyle = 'rgba(0, 255, 255, .5)';
  }

  initConfigs() {
    
    this.connectRange = 100;
    this.nodeCounter = 100;
    this.nodes = this.createRndCircleShapes(this.nodeCounter, this.cWidth, this.cHeight);
  }

  render = (): void => {

    console.log('render');
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);

    this.updateNodes(this.nodes);
    this.raf = requestAnimationFrame(this.render);
    return;
  }

  updateNodes(nodes: ICircleParticle[]): void {

    for (let i = 0, limit = nodes.length; i < limit; i++) {

      let node = nodes[i];

      node.x = maths.lock(node.x + node.vx, 0, this.cWidth);
      node.y = maths.lock(node.y + node.vy, 0, this.cHeight);

      this.drawCircle(this.ctx, node);

      this.connectAllNodes(this.nodes, i, this.connectRange);
    }
    return;
  }

  // Stroke line between nodes if in range
  connectAllNodes(nodes: ICircleParticle[], currentIndex: number, maxDist: number): void {

    let node = nodes[currentIndex];

    for (let i = currentIndex + 1, limit = nodes.length; i < limit; i++) {

      let _node = nodes[i],
        dx = _node.x - node.x,
        dy = _node.y - node.y,
        dist = Math.sqrt((dx ** 2) + (dy ** 2));

      if (dist < maxDist) {

        this.ctx.lineWidth = 1 - dist / maxDist;
        this.drawLine(this.ctx, node, _node);
      }
    }
    return;
  }

  /* ########################### */
  /* ####      Helpers      #### */
  /* ########################### */

  createRndCircleShapes(n: number, x_Max = 50, y_Max = 50, r_Max = 8, vx_Max = 2, vy_Max = 2): ICircleParticle[] {

    let _shapes: ICircleParticle[] = [];

    for (let i = 0, len = n - 1; i < len; i++) {

      _shapes.push({
        x: Math.random() * x_Max,
        y: Math.random() * y_Max,
        r: Math.random() * r_Max + 2,
        vx: Math.random() * vx_Max - vx_Max * .5,
        vy: Math.random() * vy_Max - vy_Max * .5,
      });
    }

    return _shapes;
  }

  drawCircle(ctx: CanvasRenderingContext2D, shape: ICircleParticle): void {

    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.r, 0, 6.29);
    ctx.fill();
    return;
  }

  drawLine(ctx: CanvasRenderingContext2D, p1: IPoint, p2: IPoint): void {

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    return;
  }

}
