
```ts
import { 
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
} from '@angular/core';

export class Livecycle implements OnInit, AfterContentChecked, AfterContentInit, 
                                  AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit(): void {              console.log('Livecycle ngOnInit'); }
  ngAfterContentChecked(): void { console.log('Livecycle ngAfterContentChecked'); }
  ngAfterContentInit(): void {    console.log('Livecycle ngAfterContentInit'); }
  ngAfterViewChecked(): void {    console.log('Livecycle ngAfterViewChecked'); }
  ngAfterViewInit(): void {       console.log('Livecycle ngAfterViewInit'); }
  ngOnChanges(): void {           console.log('Livecycle ngOnChanges'); }
  ngOnDestroy(): void {           console.log('Livecycle ngOnDestroy'); }

}
´´´
