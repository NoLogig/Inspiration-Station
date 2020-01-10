import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-mat-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class MatLayoutsComponent implements OnInit {

  cardMetas = {
    title: 'Material Generated Layouts',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git:  'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/mat-layouts',
      live: 'https://inspiration-station.herokuapp.com/mat-layouts',
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
