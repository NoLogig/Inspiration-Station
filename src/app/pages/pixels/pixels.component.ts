import { Component, 
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
 } from '@angular/core';

@Component({
  selector: 'nlg-pixels',
  templateUrl: './pixels.component.html',
  styleUrls: ['./pixels.component.scss']
})
export class PixelsComponent implements OnInit, AfterContentChecked, AfterContentInit, 
AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {              console.log('Pixels Init'); }
  ngAfterViewChecked(): void {    console.log('Pixels ViewChecked'); }
  ngAfterContentChecked(): void { console.log('Pixels ContentChecked'); }
  ngAfterContentInit(): void {    console.log('Pixels ContentInit'); }
  ngAfterViewInit(): void {       console.log('Pixels ViewInit'); }
  ngOnChanges(): void {           console.log('Pixels Changes'); }
  ngOnDestroy(): void {           console.log('Pixels Destroy'); }

}
