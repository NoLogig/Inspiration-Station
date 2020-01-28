import { Component,
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'nlg-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {              console.log('Impressum Init'); }
  ngAfterViewChecked() {    console.log('Impressum ViewChecked'); }
  ngAfterContentChecked() { console.log('Impressum ContentChecked'); }
  ngAfterContentInit() {    console.log('Impressum ContentInit'); }
  ngAfterViewInit() {       console.log('Impressum ViewInit'); }
  ngOnChanges() {           console.log('Impressum Changes'); }
  ngOnDestroy() {           console.log('Impressum Destroy'); }

}
