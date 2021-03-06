import { Component, OnInit } from '@angular/core';
import maths from "src/app/services/math/math.service";
import { IGoldenRatio } from 'src/app/services/math/interfaces/imath';

@Component({
  selector: 'nlg-golden-ratio',
  templateUrl: './golden-ratio.component.html',
  styleUrls: ['./golden-ratio.component.scss']
})
export class GoldenRatioComponent implements OnInit {

  public scaleView = .75;
  maths = maths;
  public golden: IGoldenRatio;

  metas = {
    title: 'CSS - Golden Ratio Sequence',
    subTitle: 'Golden Rectangles & Spiral:',
    subExtra: 'Show div\'s in golden ratio scalar. #Math #SCSS #Design',
    links: {
      down: 'https://github.com/NoLogig/Inspiration-Station/master',
      git: 'https://github.com/NoLogig/Inspiration-Station',
      live: 'https://inspiration-station.herokuapp.com',
    }
  };

  constructor() { 
    
    this.golden = {
      main: 100,
      major: 68,
      minor: 32
    }
  }

  ngOnInit() { }

}
