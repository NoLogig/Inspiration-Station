import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-spin',
  templateUrl: './hex-spin.component.html',
  styleUrls: ['./hex-spin.component.scss']
})
export class HexSpinComponent implements OnInit {

  metas = {
    title: 'Hexagon - Spin',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-spin',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
