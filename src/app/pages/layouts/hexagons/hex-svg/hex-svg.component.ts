import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-svg',
  templateUrl: './hex-svg.component.html',
  styleUrls: ['./hex-svg.component.scss']
})
export class HexSvgComponent implements OnInit {

  metas = {
    title: 'Hexagon - SVG',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-svg',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
