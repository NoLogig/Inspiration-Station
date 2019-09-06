import {
  Component,
  OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy
} from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nlg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  public title = 'NoLogig';

  public isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

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
