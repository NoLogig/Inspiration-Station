import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-scewed',
  templateUrl: './hex-scewed.component.html',
  styleUrls: ['./hex-scewed.component.scss']
})
export class HexScewedComponent implements OnInit {

  metas = {
    title: 'Hexagon - Scewed',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-scewed',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
