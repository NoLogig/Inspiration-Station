import { Component, 
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
 } from '@angular/core';

@Component({
  selector: 'nlg-peil',
  templateUrl: './peil.component.html',
  styleUrls: ['./peil.component.scss']
})
export class PEILComponent implements OnInit, AfterContentChecked, AfterContentInit, 
AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {              console.log('PEILComponent ngOnInit'); }
  ngAfterViewChecked(): void {    console.log('PEILComponent ngAfterViewChecked'); }
  ngAfterContentChecked(): void { console.log('PEILComponent ngAfterContentChecked'); }
  ngAfterContentInit(): void {    console.log('PEILComponent ngAfterContentInit'); }
  ngAfterViewInit(): void {       console.log('PEILComponent ngAfterViewInit'); }
  ngOnChanges(): void {           console.log('PEILComponent ngOnChanges'); }
  ngOnDestroy(): void {           console.log('PEILComponent ngOnDestroy'); }

}
