import { Component } from '@angular/core';

@Component({
  selector: 'nlg-sieve-eratosthenes',
  templateUrl: './sieve-eratosthenes.component.html',
  styleUrls: ['./sieve-eratosthenes.component.scss']
})
export class SieveEratosthenesComponent {

  prime: number;
  primes = [];
  limit = 100;

  constructor() { }

  initPrimeArray(limit) {

    for (let i = 0; i < limit; i++) {
      this.primes[i] = true;
    }
  }
  prevDef(e?: Event) {
    e.preventDefault();
  }
  eratosthenes() {

    this.initPrimeArray(this.limit);

    let loopLimit = this.primes.length * .5;
    let limit = this.primes.length;

    for (let i = 2; i < loopLimit; i++) {
      for (let j = 2; j < (limit / i); j++) {
        this.primes[(i * j)] = false;
      }
    }
  }

  eratosthenesOpti() {

    this.initPrimeArray(this.limit);

    let prime = 2;

    while ((prime * prime) < this.limit) {

      if (this.primes[prime]) {
        let noPrimeIndex = prime * prime;

        while (noPrimeIndex < this.limit) {

          this.primes[noPrimeIndex] = false;
          noPrimeIndex += prime;
        }
      }
      prime++;
    }

    for (let i = 2; i < this.limit; i++) {

      if (this.primes[i]) {
        console.log((i.toString(2).padStart(9, '0')));
      }
    }
  }

  * erastosSieveGenerator() {
    let n = 2;

    while (true) {
      if (this.isPrime(n++)) { yield n; }
    }
  }

  /** Checks if `n` is prime.
   * @param n The value to check
   * @returns Returns `true` if `n` is prime
   */
  isPrime(n: number): boolean {

    let nSqrt = Math.sqrt(n);
    for (let i = 2; i <= nSqrt; i++) {
      if (n % i === 0) { return false; }
    }
    return true;
  }

}

/** Sieb des Eratosthenes
 * Das Sieb des Eratosthenes ist ein Algorithmus zur Bestimmung einer
 * Liste oder Tabelle aller Primzahlen kleiner oder gleich einer vorgegebenen Zahl.
 * Es ist nach dem griechischen Mathematiker Eratosthenes von Kyrene benannt.
 * Allerdings hat Eratosthenes, der im 3. Jahrhundert v. Chr. lebte, das Verfahren nicht entdeckt,
 * sondern nur die Bezeichnung „Sieb“ für das schon lange vor seiner Zeit bekannte Verfahren eingeführt.

 * Funktionsweise
 * Zunächst werden alle  2, 3, 4, … bis zu einem frei wählbaren Maximalwert S aufgeschrieben.
 * Die zunächst unmarkierten Zahlen sind potentielle Primzahlen. Die kleinste unmarkierte Zahl ist immer eine Primzahl.
 * Nachdem eine Primzahl gefunden wurde, werden alle Vielfachen dieser Primzahl als zusammengesetzt markiert.
 * Man bestimmt die nächstgrößere nicht markierte Zahl.
 * Da sie kein Vielfaches von Zahlen kleiner als sie selbst ist (sonst wäre sie markiert worden),
 * kann sie nur durch eins und sich selbst teilbar sein. Folglich muss es sich um eine Primzahl handeln.
 * Diese wird dementsprechend als Primzahl ausgegeben. Man streicht wieder alle Vielfachen und führt das Verfahren fort,
 * bis man am Ende der Liste angekommen ist. Im Verlauf des Verfahrens werden alle Primzahlen ausgegeben.

 * Da mindestens ein Primfaktor einer zusammengesetzten Zahl immer kleiner gleich der Wurzel der Zahl sein muss, ist es ausreichend,
 * nur die Vielfachen von Zahlen zu streichen, die kleiner oder gleich der Wurzel der Schranke S sind.

 * Ebenso genügt es beim Streichen der Vielfachen, mit dem Quadrat der Primzahl zu beginnen,
 * da alle kleineren Vielfachen bereits markiert sind.
 *
 * Das Verfahren beginnt also damit, die Vielfachen 4, 6, 8, … der kleinsten Primzahl 2 durchzustreichen.
 * Die nächste unmarkierte Zahl ist die nächstgrößere Primzahl, die 3.
 * Anschließend werden deren Vielfache 9 12 15 durchgestrichen und so weiter

 * Demonstration
 * Verfahren, wie die Primzahlen zwischen 2 und 120 ermittelt werden: Erst werden alle Vielfachen von 2 gestrichen,
 * dann alle Vielfachen von 3, 5, und 7. Die Markierungen beginnen jeweils mit dem Quadrat der Primzahl: 4, 9, 25, 49.
 * Da bereits 112 = 121 nicht mehr im Wertebereich liegt, werden ab 11 keine zusammengesetzten Zahlen mehr markiert;
 * alle noch unmarkierten Zahlen sind prim.

 * Implementierung
 * Eine beispielhafte Implementierung des Algorithmus als Pseudocode:

 const N = 10000
 var gestrichen: array [2..N] of boolean

 // Initialisierung des Primzahlfeldes
 // Alle Zahlen im Feld sind zu Beginn nicht gestrichen
 for i = 2 to N do
     gestrichen[i] = false
 end

 // Siebe mit allen (Prim-) Zahlen i, wobei i der kleinste Primfaktor einer zusammengesetzten
 // Zahl j = i*k ist. Der kleinste Primfaktor einer zusammengesetzten Zahl j kann nicht größer
 // als die Wurzel von j <= n sein.
 for i = 2 to sqrt(N) do
     if not gestrichen[i] then
         // i ist prim, gib i aus...
         print i; ", ";
         // ...und streiche seine Vielfachen, beginnend mit i*i
         // (denn k*i mit k<i wurde schon als Vielfaches von k gestrichen)
         for j = i*i to N step i do
             gestrichen[j] = true
         end
     end if
 end
 // Gib die Primzahlen größer als Wurzel(n) aus - also die, die noch nicht gestrichen wurden
 for i = sqrt(N)+1 to N do
     if not gestrichen[i] then
         // i ist prim, gib i aus
         print i; ", ";
     end if
 end

 * Optimiertes Verfahren:
 * Es werden nur die bisher nicht markierten Vielfachen einer Primzahl markiert
 * Das Verfahren lässt sich optimieren, wenn nur die ungeraden Zahlen darin abgespeichert werden.
 * Generell kann man zu einem (kleinen) Produkt von (Prim)zahlen die möglichen Primzahlen bestimmen.
 * Das Sieben muss dann nur auf das Vielfache dieser Zahlen angewendet werden.
 * Im Beispiel besteht jede Zeile aus 10 = 2*5 Einträgen. Man kann erkennen, dass die Vielfachen von 2, 4, 5, 6, 8, 10
 * in den darunter liegenden Zeilen nicht betrachtet werden müssen, da sie als Vielfache von 2 bzw. 5 nicht als Primzahlen in Fragen kommen.
 * Diese Vielfachen sind als vertikale Linien erkennbar.
 * Es gibt effizientere Verfahren als das Sieb des Eratosthenes (z. B. das Sieb von Atkin)
 **/
