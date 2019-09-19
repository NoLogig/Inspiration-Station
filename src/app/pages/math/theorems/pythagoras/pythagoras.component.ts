import { Component, ElementRef, ViewChild } from '@angular/core';
import { ITheoremPythagoras, ITriangle } from 'src/app/services/math/interfaces/imath';



// Speeds rad/deg converters performance in iterations up
const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;
const FULL_ARC = Math.PI * 2;

@Component({
  selector: 'nlg-pythagoras',
  templateUrl: './pythagoras.component.html',
  styleUrls: ['./pythagoras.component.scss']
})
export class PythagorasComponent {
  
  public rightTriShape: ITheoremPythagoras = {
    adjacent: undefined,
    opposite: 20,
    hypotenuse: 40
  };

}
