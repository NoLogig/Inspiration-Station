import {
  Component, Input,
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
} from '@angular/core';
import { ActiveDirective } from '../directives/active.directive';

@Component({
  selector: 'nlg-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  providers: [ActiveDirective]
})

export class BusinessCardComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnDestroy {

  @Input('metas') public metas;

  @Input('nlg-extra') public extra;
  @Input('nlg-subtitle') public subtitle;
  @Input('nlg-title') public title;
  @Input('nlg-links') public links;

  defaultMetas = {
    title: 'Project X',
    subTitle: 'Experimentals:',
    subExtra: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/master',
      git: 'https://github.com/NoLogig/Inspiration-Station',
      live: 'http://inspiration-station.herokuapp.com',
    }
  };

  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {
    console.log('BusinessCard Init');

    if (this.metas) {

      this.title = this.metas.title;
      this.subtitle = this.metas.subTitle;
      this.extra = this.metas.subExtra;
      this.links = this.metas.links;
      return;
    }

    this.title = this.defaultMetas.title;
    this.subtitle = this.defaultMetas.subTitle;
    this.extra = this.defaultMetas.subExtra;
    this.links = this.defaultMetas.links;
    return;
  }

  ngAfterContentChecked(): void { console.log('BusinessCard ContentChecked'); }
  ngAfterContentInit():    void { console.log('BusinessCard ContentInit'); }
  ngAfterViewChecked():    void { console.log('BusinessCard ViewChecked'); }
  ngAfterViewInit():       void { console.log('BusinessCard ViewInit'); }
  ngOnChanges():           void { console.log('BusinessCard Changes'); }
  ngOnDestroy():           void { console.log('BusinessCard Destroy'); }

}