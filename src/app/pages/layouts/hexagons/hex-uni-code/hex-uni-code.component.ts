import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-uni-code',
  templateUrl: './hex-uni-code.component.html',
  styleUrls: ['./hex-uni-code.component.scss']
})
export class HexUniCodeComponent implements OnInit {

  metas = {
    title: 'Hexagon - Uni-Code',
    subTitle: '',
    subExtra: '',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/archive/master.zip',
      git: 'https://github.com/NoLogig/Inspiration-Station/tree/master/src/app/pages/layouts/hexagons/hex-uni-code',
      live: 'https://inspiration-station.herokuapp.com/hexagon',
    }
  };

  ngOnInit() { }
}
