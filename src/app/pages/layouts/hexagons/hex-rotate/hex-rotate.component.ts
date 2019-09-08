import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-rotate',
  templateUrl: './hex-rotate.component.html',
  styleUrls: ['./hex-rotate.component.scss']
})
export class HexRotateComponent implements OnInit {

  metas = {
    title: 'Hexagon - Rotate',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-rotate',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
