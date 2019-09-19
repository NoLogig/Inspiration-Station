import { Component } from '@angular/core';
import { lookups } from "src/app/services/math/math.service";

@Component({
  selector: 'nlg-factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.scss']
})
export class FactorialComponent {

  title = 'Factorial';
  factorials: number[];

  constructor() {

    this.factorials = lookups.factorials;

  }

}
