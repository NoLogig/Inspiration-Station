import {
  Component, Input,
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Output
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'nlg-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  @Output('multiple') multi;

  multiple = false;
  range = 0;
  indeterminate = false;
  disabled = false;
  labelPosition: 'before' | 'after' = 'after';
  color: ThemePalette = 'accent';
  
  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit():              void { console.log('Settings Init'); }
  ngAfterContentChecked(): void { console.log('Settings ContentChecked'); }
  ngAfterContentInit():    void { console.log('Settings ContentInit'); }
  ngAfterViewChecked():    void { console.log('Settings ViewChecked'); }
  ngAfterViewInit():       void { console.log('Settings ViewInit'); }
  ngOnChanges():           void { console.log('Settings Changes'); }
  ngOnDestroy():           void { console.log('Settings Destroy'); }

}