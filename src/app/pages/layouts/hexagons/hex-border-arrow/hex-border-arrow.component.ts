import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-border-arrow',
  templateUrl: './hex-border-arrow.component.html',
  styleUrls: ['./hex-border-arrow.component.scss']
})
export class HexBorderArrowComponent implements OnInit {

  metas = {
    title: 'Hexagon - Border Arrow Img',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-border-arrow',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
