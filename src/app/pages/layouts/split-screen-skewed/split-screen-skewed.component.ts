import { Component, OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'nlg-split-screen-skewed',
  templateUrl: './split-screen-skewed.component.html',
  styleUrls: ['./split-screen-skewed.component.scss']
})
export class SplitScreenSkewedComponent implements OnInit, AfterContentChecked, AfterContentInit, 
AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

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
