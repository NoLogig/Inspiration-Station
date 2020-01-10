import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-skewed',
  templateUrl: './hex-skewed.component.html',
  styleUrls: ['./hex-skewed.component.scss']
})
export class HexSkewedComponent implements OnInit {

  metas = {
    title: 'Hexagon - Skewed',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-skewed',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
