import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';

interface IParallaxMouse {
  targetContainer: HTMLElement;
  moveFactor: number;
  zIndex: number;
}

@Component({
  selector: 'nlg-parallax-mouse',
  templateUrl: './parallax-mouse.component.html',
  styleUrls: ['./parallax-mouse.component.scss']
})
export class ParallaxMouseJSComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {


  metas = {
    title: 'Parallax Mouse - JS',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/parallax/mouse-parallax',
      live: 'https://inspiration-station.herokuapp.com/parallax-mouse',
    }
  };

  title = 'Mouse Parallax Component';
  parallaxElements: IParallaxMouse[];

  constructor() { }

  parallaxMouse(event: MouseEvent, p: IParallaxMouse ) {

    let mouseX = event.pageX;
    let mouseY = event.pageY;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let percentX = ((mouseX / windowWidth) * p.moveFactor) - (p.moveFactor / 2);
    let percentY = ((mouseY / windowHeight) * p.moveFactor) - (p.moveFactor / 2);

    let topString = (0 - percentY - p.moveFactor) + '%';
    let leftString = (0 - percentX - p.moveFactor) + '%';
    let rightString = (0 - percentX - p.moveFactor) + '%';
    let bottomString = (0 - percentY - p.moveFactor) + '%';

    p.targetContainer.style.top = topString;
    p.targetContainer.style.left = leftString;
    p.targetContainer.style.right = rightString;
    p.targetContainer.style.bottom = bottomString;

    if (p.zIndex) {
      p.targetContainer.style.zIndex = p.zIndex.toString();
    }
  }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {              console.log('SplitScreen Init'); }
  ngAfterViewChecked(): void {    console.log('SplitScreen ViewChecked'); }
  ngAfterContentChecked(): void { console.log('SplitScreen ContentChecked'); }
  ngAfterContentInit(): void {    console.log('SplitScreen ContentInit'); }
  ngAfterViewInit(): void {       console.log('SplitScreen ViewInit'); }
  ngOnChanges(): void {           console.log('SplitScreen Changes'); }
  ngOnDestroy(): void {           console.log('SplitScreen Destroy'); }

}
