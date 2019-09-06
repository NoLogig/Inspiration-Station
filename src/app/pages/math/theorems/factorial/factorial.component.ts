import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import maths from "src/app/services/math/math.service";

@Component({
  selector: 'nlg-factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.scss']
})
export class FactorialComponent {

  title = 'Factorial';

  constructor() { }


}
