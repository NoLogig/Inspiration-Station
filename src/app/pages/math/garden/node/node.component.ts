import { 
  Component,ViewChild, ElementRef, NgZone,
  OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterViewInit, AfterContentInit, OnChanges 
} from '@angular/core';
import { ICircleParticle } from 'src/app/services/math/interfaces/imath';
import { utils } from 'src/app/services/math/math.service';
import ctxTools from "src/app/utils/tools/paint-tools.service";

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
    this.nodeCounter = Math.floor(window.innerWidth / 10);
    this.nodes = this.createRndCircleShapes(this.nodeCounter, this.cWidth, this.cHeight);
  }

  render = (): void => {

    // console.log('nodegarden render');
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);

    this.updateNodes(this.nodes);
    this.raf = requestAnimationFrame(this.render);
    return;
  }

  updateNodes(nodes: ICircleParticle[]): void {

    for (let i = 0, limit = nodes.length; i < limit; i++) {

      let node = nodes[i];

      node.x = utils.lock(node.x + node.vx, 0, this.cWidth);
      node.y = utils.lock(node.y + node.vy, 0, this.cHeight);

      ctxTools.draw.circle(this.ctx, node);
      ctxTools.connectNodes(this.ctx, this.nodes, i, this.connectRange);

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

}
