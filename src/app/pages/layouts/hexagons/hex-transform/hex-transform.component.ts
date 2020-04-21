import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-transform',
  templateUrl: './hex-transform.component.html',
  styleUrls: ['./hex-transform.component.scss']
})
export class HexTransformComponent implements OnInit {

  metas = {
    title: 'Hexagon - Transform',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-transform',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };

  items: any[] = Array(6);

  constructor() { }

  ngOnInit() {
  }

}
