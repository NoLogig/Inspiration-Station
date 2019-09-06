import { Component, OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'nlg-theorems',
  templateUrl: './theorems.component.html',
  styleUrls: ['./theorems.component.scss']
})
export class TheoremsComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {              console.log('Home Init'); }
  ngAfterViewChecked() {    console.log('Home ViewChecked'); }
  ngAfterContentChecked() { console.log('Home ContentChecked'); }
  ngAfterContentInit() {    console.log('Home ContentInit'); }
  ngAfterViewInit() {       console.log('Home ViewInit'); }
  ngOnChanges() {           console.log('Home Changes'); }
  ngOnDestroy() {           console.log('Home Destroy'); }

}
