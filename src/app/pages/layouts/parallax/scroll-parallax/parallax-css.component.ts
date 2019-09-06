import { Component, OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'nlg-parallax-css',
  templateUrl: './parallax-css.component.html',
  styleUrls: ['./parallax-css.component.scss']
})
export class ParallaxCSSComponent implements OnInit, AfterContentChecked, AfterContentInit, 
AfterViewChecked, AfterViewInit, OnChanges, OnDestroy  {

  constructor() { }

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
