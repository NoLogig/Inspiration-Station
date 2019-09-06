
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-number-shazam',
  templateUrl: './number-shazam.component.html',
  styleUrls: ['./number-shazam.component.scss']
})
export class NumberShazamComponent implements OnInit {

  limit = 63;
  bits: boolean[];
  possibles: number[];
  guessN = 0;
  cards: boolean[];

  constructor() {
    this.resetCards();
  }

  /** Determites how many bits the limit number need to represent and return it */
  initBits(limit: number): number {
    return Math.ceil(Math.log2(limit));
  }

  initPossibles(limit: number): number[] {
    let arr = [];
    for (let n = 0; n <= limit; n++) { arr.push(n); }
    arr.splice(0, 1);
    return arr;
  }

  /** Add to guess number the value of given bit */
  guessNumber(bits: boolean[]): number {
    let n = 0;
    for (let bit = 0; bit <= bits.length - 1; bit++) {
      if (bits[bit]) { n += 2 ** bit; }
    }
    return n;
  }

  resetCards(): void {
    this.bits = new Array(this.initBits(this.limit)).fill(false);
    this.cards = this.bits.concat();
    this.possibles = this.initPossibles(this.limit);
    this.guessN = 0;
  }

  nCompareBit(n: number, bit: number): boolean {
    if (((n & (2 ** bit)) === (2 ** bit))) { return true; }
    return false;
  }

  setBit(index: number, val: boolean) {
    this.bits[index] = val;
  }

  ngOnInit() { }

}
