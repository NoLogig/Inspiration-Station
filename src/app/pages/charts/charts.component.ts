import { Component,
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'nlg-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

  metas = {
    title: 'ChartsJS',
    subTitle: 'Display Data In Angular +2:',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/master',
      git: 'https://github.com/NoLogig/Inspiration-Station/src/app/pages/charts',
      live: 'https://inspiration-station.herokuapp.com/charts',
    }
  };

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor() { }

  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {              console.log('Charts Init'); }
  ngAfterViewChecked() {    console.log('Charts ViewChecked'); }
  ngAfterContentChecked() { console.log('Charts ContentChecked'); }
  ngAfterContentInit() {    console.log('Charts ContentInit'); }
  ngAfterViewInit() {       console.log('Charts ViewInit'); }
  ngOnChanges() {           console.log('Charts Changes'); }
  ngOnDestroy() {           console.log('Charts Destroy'); }

}
