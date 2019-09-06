import { Component } from '@angular/core';

@Component({
  selector: 'nlg-sieve-atkin',
  templateUrl: './sieve-atkin.component.html',
  styleUrls: ['./sieve-atkin.component.scss']
})
export class SieveAtkinComponent {

  prime: number;
  primes = [];
  limit = 100;

  constructor() {

  }

  initPrimeArray(limit) {

    for (let i = 0; i < limit; i++) {
      this.primes[i] = false;
    }
    this.primes[1] = true;
    this.primes[2] = true;
    this.primes[3] = true;
  }

  atkin() {

    // All values are non-prie
    this.initPrimeArray(this.limit);

    let limit = this.primes.length;
    let sqrtlimit = Math.sqrt(limit);

    // isPrime()
    for (let x = 1; x <= sqrtlimit; x++) {

      // sqare²
      let xsqr = x * x;

      for (let y = 1; y <= sqrtlimit; y++) {

        let ysqr = y * y;
        let nxy = 4 * xsqr + ysqr;
        let nmod12 = nxy % 12;

        if (nxy <= limit && (nmod12 === 1 || nmod12 === 5)) {
          this.primes[nxy] = (this.primes[nxy]) ? false : true;
        }

        nxy = 3 * xsqr + ysqr;
        if (nxy <= limit && nxy % 12 === 7) {
          this.primes[nxy] = (this.primes[nxy]) ? false : true;
        }

        nxy = 3 * xsqr - ysqr;
        if (x > y && nxy <= limit && nxy % 12 === 11) {
          this.primes[nxy] = (this.primes[nxy]) ? false : true;
        }
      }
    }

    for (let n = 5; n <= sqrtlimit; n++) {

      if (this.primes[n]) {
        let max = Math.floor(limit / n / n);
        let nsqr = n * n;

        for (let k = 1; k <= max; k++) {
          this.primes[k * nsqr] = false;
        }
      }
    }
  }
}

/** Sieb von Atkin
  * Zur Navigation springenZur Suche springen
  * Das Sieb von Atkin ist ein schneller, moderner Algorithmus zur Bestimmung aller Primzahlen
  * bis zu einer vorgegebenen Grenze. Es ist eine optimierte Version des antiken Sieb des Eratosthenes:
  * Das Atkinsieb leistet einige Vorarbeit und streicht dann alle Vielfachen von Primzahlquadraten.
  * Es wurde von A. O. L. Atkin und Daniel J. Bernstein entwickelt.
  *
  * Inhaltsverzeichnis
  * 1	Algorithmus
  * 2	Erklärung
  * 3	Komplexität
  * 4	Literatur
  * 5	Weblinks
  *
  * Algorithmus
  * Alle Reste sind Modulo 60 Reste (der Rest nach einer Division durch 60 wird betrachtet).
  * Alle Zahlen, auch x und y, sind positive ganze Zahlen.
  *
  * Im Folgenden bedeutet Invertieren eines Eintrags der Siebliste,
  * dass dessen Markierung (prim oder nicht-prim) zum Gegenteil gewechselt wird.
  *
  * Erstelle eine mit 2, 3 und 5 gefüllte Ergebnisliste.
  *   Erstelle eine Siebliste mit einem Eintrag für jede positive ganze Zahl.
  *     Alle Einträge dieser Liste werden am Anfang als nicht-prim markiert.
  *
  * Für jeden Eintrag 'n' in der Siebliste führe folgendes aus:
  *   Falls der Eintrag eine Zahl mit Rest 1, 13, 17, 29, 37, 41, 49 oder 53 enthält, invertiere ihn für jede mögliche Lösung der Gleichung:
  *     4x² + y² = n.
  *   Falls der Eintrag eine Zahl mit Rest 7, 19, 31 oder 43 enthält, invertiere ihn für jede mögliche Lösung der Gleichung:
  *     3x² + y² = n.
  *   Falls der Eintrag eine Zahl mit Rest 11, 23, 47 oder 59 enthält, invertiere ihn für jede mögliche Lösung der Gleichung:
  *     3x² − y² = n, wobei   x > y.
  *
  * Beginne mit der niedrigsten Zahl in der Siebliste.
  *   Nimm die nächste Zahl in der Siebliste, die immer noch als prim markiert ist.
  *     Füge die Zahl in die Ergebnisliste ein.
  *       Quadriere die Zahl und markiere alle Vielfachen von diesem Quadrat als nicht-prim.
  *         Wiederhole die Schritte 5 bis 8.
  *
  * Erklärung
  *   Der Algorithmus ignoriert alle Zahlen, die durch zwei, drei oder fünf teilbar sind.
  *
  *   Alle Zahlen mit Modulo 60 Rest
  *     0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58
  *     sind teilbar durch zwei und nicht prim.
  *
  *   Alle Zahlen mit Modulo 60 Rest
  *     3, 9, 15, 21, 27, 33, 39, 45, 51 oder 57 sind teilbar durch drei und nicht prim.
  *
  *   Alle Zahlen mit Modulo 60 Rest 5, 25, 35 oder 55 sind teilbar durch 5 und nicht prim.
  *     Diese Reste werden alle ignoriert.
  *
  *   Alle Zahlen mit Modulo 60 Rest 1, 13, 17, 29, 37, 41, 49 oder 53 haben einen Modulo 4 Rest von 1.
  *     Diese Zahlen sind genau dann prim,
  *     wenn die Anzahl an Lösungen für 4x² + y² = n ungerade ist und die Zahl quadratfrei ist.
  *
  *   Alle Zahlen mit Modulo 60 Rest 7, 19, 31 oder 43 haben einen Modulo 6 Rest von 1.
  *     Diese Zahlen sind genau dann prim, wenn die Anzahl an Lösungen für   3x² + y² = n   ungerade ist und die Zahl quadratfrei ist.
  *
  *   Alle Zahlen mit Modulo 60 Rest 11, 23, 47 oder 59 haben einen Modulo 12 Rest von 11.
  *     Diese Zahlen sind genau dann prim, wenn die Anzahl an Lösungen für   3x² − y² = n   ungerade ist und die Zahl quadratfrei ist.
  *
  *   Keine der potentiellen Primzahlen sind teilbar durch 2, 3 oder 5, also können sie nicht durch ihre Quadrate teilbar sein.
  *     Deshalb wird die Quadratfreiheit nicht bei 2², 3², und 5² überprüft.
  *
  * Komplexität
  * Das Sieb von Atkin hat eine Laufzeitkomplexität von
  * {\displaystyle {\mathcal {O}}\left(N\right)} {\mathcal  {O}}\left(N\right)
  * und einen Speicherbedarf von {\displaystyle {\mathcal {O}}\left(N\right)} {\mathcal  {O}}\left(N\right) Bits.
  *
  * Zum Vergleich: Das Sieb des Eratosthenes hat eine Laufzeitkomplexität von
  * {\displaystyle {\mathcal {O}}(N\log \log N)} {\mathcal  {O}}(N\log \log N)
  * und benötigt {\displaystyle {\mathcal {O}}\left(N\right)} {\mathcal  {O}}\left(N\right) Bits.
  *
  * Dabei ist {\displaystyle {\mathcal {O}}} {\mathcal {O}} das Landau-Symbol und
  * {\displaystyle N} N die Anzahl der zu untersuchenden Zahlen.
  **/
