import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-border-arrow-img',
  templateUrl: './hex-border-arrow-img.component.html',
  styleUrls: ['./hex-border-arrow-img.component.scss']
})
export class HexBorderArrowImgComponent implements OnInit {

  metas = {
    title: 'Hexagon - Border Arrow Img',
    subTitle: 'CSS',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-border-arrow-img',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
