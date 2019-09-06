import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-hex-transform',
  templateUrl: './hex-transform.component.html',
  styleUrls: ['./hex-transform.component.scss']
})
export class HexTransformComponent implements OnInit {

  items: any[] = Array(6);

  constructor() { }

  ngOnInit() {
  }

}
