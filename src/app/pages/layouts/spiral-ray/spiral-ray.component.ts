import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'nlg-spiral-ray',
  templateUrl: './spiral-ray.component.html',
  styleUrls: ['./spiral-ray.component.scss']
})
export class SpiralRayComponent implements OnInit, AfterContentChecked, AfterContentInit, 
AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  items = [];

  metas = {
    title: 'CSS - Particle Spiral Ray',
    subTitle: 'Show up div\'s as ray particles:',
    subExtra: 'Math, SCSS',
    links: {
      down: 'https://github.com/NoLogig/Node-garden/master',
      git: 'https://github.com/NoLogig/Node-garden',
      live: 'https://heroku.apps.com/NoLogig/Node-garden',
    }
  };


  constructor() {
    this.items.length = 10;
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
