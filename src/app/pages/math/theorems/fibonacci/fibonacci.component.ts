import { Component } from '@angular/core';
import { lookups } from "src/app/services/math/math.service";

@Component({
  selector: 'nlg-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent {

  fibonaccis = lookups.fibonaccis;
  title = 'fibonacci';

  constructor() { }

}
