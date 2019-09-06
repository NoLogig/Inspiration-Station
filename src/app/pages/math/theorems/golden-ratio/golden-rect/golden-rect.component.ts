import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nlg-golden-rect',
  templateUrl: './golden-rect.component.html',
  styleUrls: ['./golden-rect.component.scss']
})
export class GoldenRectComponent implements OnInit {

  @Input() repeat: number;

  constructor() { }

  ngOnInit() {
    this.repeat -= 1;
  }

}
