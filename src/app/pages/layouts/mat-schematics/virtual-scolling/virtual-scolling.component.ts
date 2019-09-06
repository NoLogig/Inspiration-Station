import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-virtual-scolling',
  templateUrl: './virtual-scolling.component.html',
  styleUrls: ['./virtual-scolling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VirtualScollingComponent implements OnInit {

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor() { }

  ngOnInit() {
  }

}
