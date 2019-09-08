import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-gradient',
  templateUrl: './hex-gradient.component.html',
  styleUrls: ['./hex-gradient.component.scss']
})
export class HexGradientComponent implements OnInit {

  metas = {
    title: 'Hexagon - Gradient',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-gradient',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
