import { Component } from '@angular/core';
import { ITheoremPythagoras } from 'src/app/services/math/interfaces/imath';

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
