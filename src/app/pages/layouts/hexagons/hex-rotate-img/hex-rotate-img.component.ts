import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-rotate-img',
  templateUrl: './hex-rotate-img.component.html',
  styleUrls: ['./hex-rotate-img.component.scss']
})
export class HexRotateImgComponent implements OnInit {

  metas = {
    title: 'Hexagon - Rotate',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-rotate-img',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
