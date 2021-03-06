import { Component, OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'nlg-split-screen-skewed',
  templateUrl: './split-screen-skewed.component.html',
  styleUrls: ['./split-screen-skewed.component.scss']
})
export class SplitScreenSkewedComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  metas = {
    title: 'SplitScreen - CSS',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git:  'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/home',
      live: 'https://inspiration-station.herokuapp.com',
    }
  };

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
