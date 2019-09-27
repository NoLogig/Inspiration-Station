import { Observable, range, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';
import { IGoldenRatio, IPoint, ITheoremPythagoras, ITriangle } from './interfaces/imath';


export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;
export const PI = Math.PI;
export const CIRCLE = Math.PI * 2;
export const PHI = 1.61803398875;


export class MathUtilsService {

    // Depending on wich language you use, mathematical way is faster than internal 2/3D access
    array = {

        /** Array 1D - As 2D Matrix
         * @example  x/y x0_x1_x2_x3
         *           y0 |▓▓▒▓▓▒▓▓▒▓▓|   0 -  3
         *           y1 |▓▓▒▓▓▒▓▓▒▓▓|   4 -  7
         *           y2 |▓▓▒▓▓▒2D|__|   8 - 11
         *           y3 |__|__|__|__|  12 - 15
         *
         *  point2D = [2,2] = Array indexposition 10
         *  numCols = 4
         *
         *   row * numCols + currentCol = index 2D
         *   2   * 4       + 2          = 10
         */
        as2D: (x: number, y: number, cols: number): number => y * cols + x,
        // set2D: (x: number, y: number, cols: number, val: any): void => this.MYARRAY[y*cols+x] = val;

        /** Array 1D - As 3D Matrix
         * @example ...... _____________
         *     ...z2 ╱__╱__╱__╱__ ╱|
         *    ..z1 ╱__╱__╱__╱__ ╱ |
         *   .z0 ╱__╱__╱__╱__ ╱  |
         *  y0 |▒▓▓▒▓▓▒▓▓▒▓▓▒|  |
         *  y1 |▒▓▓▒▓▓▒▓▓▒▓▓▒|  ╱
         *  y2 |▒▓▓▒▓▓▒3D░▒▒░| ╱
         *  y3 |░▒▒░▒▒░▒▒░▒▒░|╱
         *  .....x0 x1 x2 x3
         *
         *  3D_Point = [x2, y2, z1] = Array indexposition 26
         *
         *  (y * cols + x) + (cols * deeps * z) = index 3D
         *  (2 * 4    + 2) + (4    * 4     * 1) = index 3D
         *  (    10      ) + (       16       ) = 26
         */
        as3D: (x: number, y: number, z: number, cols: number, deeps: number): number => (y * cols + x) + (cols * deeps * z)
        // set3D: (x: number, y: number, z: number, cols: number, deeps: number, value: any): void => this.MYARR[(y*cols+x) + (cols*deeps*z)] = value;
    
    };

    /** Factorial algorithms: n!
     *     5! = 5 * 4 * 3 * 2 * 1 = 120
     *     0! = 1 so that 1! = 1 * 0! = 1
     */
    factorial = {

        factorialCounter$: {} as Observable<number>,
        factorial$: {} as Observable<number>,
        
        observer: (n: number): Subscription => {

            this.factorial.factorialCounter$ = range(1, n);
            this.factorial.factorial$ = this.factorial.factorialCounter$.pipe(scan((acc, value) => acc * value));

            return this.factorial.factorial$.subscribe(
                (x) => { console.log('Next: ' + x); },
                (err) => { console.log('Error: ' + err); },
                () => { console.log('Complete'); }
            );
            // ToDo: Test: <div>{{ counter$ | async }}! = {{ factorial$ | async }}</div>
        },

        recursive: (n: number): number => {

            if (n < 0) { return -1; }
            if (n === 0 || n === 1) { return 1; }

            return (n * this.factorial.recursive(n - 1));
        },

        while(n: number): number {

            let f = n;

            if (n === 0 || n === 1) { return 1; }

            while (n > 1) { f *= --n; }

            return f;
        },

        for(n: number): number {
            // If num = 0 OR num = 1, the factorial will return 1
            if (n === 0 || n === 1) { return 1; }

            // Start the loop with i = 4
            // Decrement i after each iteration
            // Store the value of num at each iteration
            for (let i = n - 1; i >= 1; i--) { n *= i; }
            /*              num      var i = num - 1       num *= i         i--       i >= 1?
            1st iteration:   5           4 = 5 - 1         20 = 5 * 4        3          yes
            2nd iteration:  20           3 = 4 - 1         60 = 20 * 3       2          yes
            3rd iteration:  60           2 = 3 - 1        120 = 60 * 2       1          yes
            4th iteration: 120           1 = 2 - 1        120 = 120 * 1      0          no
            5th iteration: 120               0                120
            End of the loop
            */
            return n;   // 120
        },

        // Monadic bind (chain) for lists
        chain(xs, f) { return [].concat.apply([], xs.map(f)); },

        // [m..n]
        range(m, n) {
            return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
                return m + i;
            });
        },

        factors(n) {
            return this.chain(this.range(1, n), function (x) {  // monadic chain/bind
                return n % x ? [] : [x];                        // monadic fail or inject/return
            });
        }

    };

    /** Fibonacci algorithms: (Phi Φ)
     *  Bench Profile with 79 numbers
     *     original:   890088ns
     *     memorized:  366415ns
     *     formula:    309792ns
     *     lookup:     191683ns
     */
    fibonacci = {

        // Fibonacci Recursive Generator - #worst
        * recursiveGenerator(n: number, current = 0, next = 1): IterableIterator<number> {

            if (n === 0) { return 0; }

            yield current;
            yield* this.fibonaccibRecursive(n - 1, next, current + next);
        },

        // Fibonacci Iterative Generator - #best if calculate values > 75!
        * iterativeGenerator(n: number): IterableIterator<number> {

            const isInfinite = isFinite(n);
            let current = 0,
                next = 1;

            while (!isInfinite || n--) {

                yield current;
                [current, next] = [next, current + next];
            }
        },

        // Fibonacci lookup Array - #best if memory is wayne
        * lookupGenerator(n: number): IterableIterator<number> {

            if (n > 79) { throw new Error('Not available for n > 79.'); }
            yield* lookups.fibonaccis.slice(0, n);
        },

        // Formula way is fastest as values don’t need to be higher than 75!
        formulaCalc(n: number): number {

            return Math.round((1 / Math.sqrt(5)) * (Math.pow(((1 + Math.sqrt(5)) * .5), n) - Math.pow(((1 - Math.sqrt(5)) * .5), n)));
        },
        * formulaGenerator(n: number): IterableIterator<number> {

            const isInfinite = isFinite(n);
            let current = 0;

            while (!isInfinite || n--) {
                yield this.fibFormulaCalc(current);
                current++;
            }
        }

    };

    /** ℙ Prime Numbers */
    prime = {

        /** Creates a new primality instance.
         * @param numStrArr A number, string or array to check the primality of.
         * @returns Returns `true` if `nsa` is prime.
         * @example primality(7);
         * // => true
         * primality('13');
         * // => true
         * primality([17, 19, 23]);
         * // => true
         */
        primality(numStrArr: number | string | any[]): boolean {

            if (numStrArr === null || numStrArr === '') { return null; }

            if (numStrArr instanceof Array) {

                let i = numStrArr.length;
                while (i--) {

                    if (!this.isPrime(numStrArr[i])) { return false; }
                }

                return true;
            }

            return this.isPrime(numStrArr);
        },
        /** Checks if `n` is prime.
         * @param n The value to check
         * @returns Returns `true` if `n` is prime
         */
        isPrime(n: any): boolean {

            if (n % 1 || n < 2 || isNaN(n) || !isFinite(n)) { return false; }
            if (n !== this.leastFactor(n)) { return false; }

            return true;
        },

        /** Checks if `n` is prime.
         * @param n The value to check
         * @returns `true` if `n` is a prime number
         */
        isPrimeSqrtLoop(n: number): boolean {

            let nSqrt = Math.sqrt(n);
            for (let i = 2; i <= nSqrt; i++) {

                if (n % i === 0) { return false; }
            }

            return true;
        },

        /** Finds the smallest factor of `n`
         * @param n The value to check
         * @returns The smallest prime that divides n
         *            NaN if n is NaN or Infinity
         *            0 if n is 0
         *            1 if n = 1, n = -1, or n is not an integer
         */
        leastFactor(n: number): number {

            if (n === 0) { return 0; }
            if (n % 1 || n * n < 2) { return 1; }
            if (n % 2 === 0) { return 2; }
            if (n % 3 === 0) { return 3; }
            if (n % 5 === 0) { return 5; }

            let n2 = Math.sqrt(n);

            for (let i = 7; i <= n2; i += 30) {

                if (n % i === 0) { return i; }
                if (n % (i + 4) === 0) { return i + 4; }
                if (n % (i + 6) === 0) { return i + 6; }
                if (n % (i + 10) === 0) { return i + 10; }
                if (n % (i + 12) === 0) { return i + 12; }
                if (n % (i + 16) === 0) { return i + 16; }
                if (n % (i + 22) === 0) { return i + 22; }
                if (n % (i + 24) === 0) { return i + 24; }
            }

            return n;
        },

        /** Checks if `a` and `b` are primes which differ by `difference`.
         * @param a First of the pair
         * @param b Second of the pair
         */
        related(a: number, b: number, difference: number): boolean { return Math.abs(a - b) !== difference ? false : this.primality([a, b]); },

        /** Checks if `a` and `b` are twin primes
         * <https://en.wikipedia.org/wiki/Twin_prime>
         * @param a First of the pair
         * @param b Second of the pair
         * @returns Returns `true` if `a` and `b` are twin primes
         * @example primality.primeTwins(3, 5)
         *          → true
         */
        twins(a: number, b: number): boolean { return this.primeRelated(a, b, 2); },

        /** Checks if `a` and `b` are cousin primes
         * <https://en.wikipedia.org/wiki/Cousin_prime>
         * @param a First of the pair
         * @param b Second of the pair
         * @returns Returns `true` if `a` and `b` are cousin primes
         * @example primality.primeCousins(3, 7)
         *          → true
         */
        cousins(a: number, b: number) { return this.primeRelated(a, b, 4); },

        /** Checks if `a` and `b` are sexy primes
         * <https://en.wikipedia.org/wiki/Sexy_prime>
         * @param a First of the pair
         * @param b Second of the pair
         * @returns Returns `true` if `a` and `b` are sexy primes
         * @example primality.primeSexy(5, 11)
         *          → true
         */
        sexy(a: number, b: number) { return this.primeRelated(a, b, 6); },

        /** Checks if `n` is a Wilson prime.
         * <https://en.wikipedia.org/wiki/Wilson_prime>
         * @returns Returns `true` if `n` is a Wilson prime.
         * @example primality.primeWilson(5);
         *          → true
         */
        wilson(n: number): boolean { return this.lookups.wilsonPrime.includes(n, 0) ? true : (this.factorialFor(n - 1) + 1) % n ** 2 === 0; },

        /** Checks if `n` is a Wieferich prime.
         * <https://en.wikipedia.org/wiki/Wieferich_prime>
         * @returns Returns `true` if `n` is a Wieferich prime.
         * @example primality.primeWieferich(1093);
         *          → true
         */
        wieferich(n: number): boolean { return this.lookups.wieferichPrime.includes(n, 0) ? true : (Math.pow(2, n - 1) - 1) % n ** 2 === 0; },


        atkin(c_max: number) {

            let Zahlenfeld = [];
            let wurzel_c_max, n, k;

            for (let i = 0; i <= c_max; i++) { Zahlenfeld[i] = false; }

            wurzel_c_max = Math.sqrt(c_max);

            for (let a = 1; a <= wurzel_c_max; a++) {

                for (let b = 1; b <= wurzel_c_max; b++) {

                    n = 4 * a * a + b * b;
                    if (n <= c_max && (n % 12 === 1 || n % 12 === 5)) {

                        if (Zahlenfeld[n]) { Zahlenfeld[n] = false; } else { Zahlenfeld[n] = true; }
                    }

                    n = 3 * a * a + b * b;
                    if (n <= c_max && n % 12 === 7) {

                        if (Zahlenfeld[n]) { Zahlenfeld[n] = false; } else { Zahlenfeld[n] = true; }
                    }

                    n = 3 * a * a - b * b;
                    if (a > b && n <= c_max && n % 12 === 11) {

                        if (Zahlenfeld[n]) { Zahlenfeld[n] = false; } else { Zahlenfeld[n] = true; }
                    }

                }

            }

            for (n = 0; n <= wurzel_c_max; n++) {

                if (Zahlenfeld[n]) {

                    for (k = 1; k * n * n <= c_max; k++) { Zahlenfeld[k * n * n] = false; }
                }

            }

            Zahlenfeld[2] = true;
            Zahlenfeld[3] = true;
            let count = 0;

            for (let i = 2; i <= c_max; i++) {

                if (Zahlenfeld[i] === true) { count++; }
            }

        },

        buehler(c_o: number) {

            let k;
            let pmax; pmax = 0;
            let p; p = new Array(); p[0] = 2; // Liste der gefundenen Primzahlen
            let psum; psum = new Array(); psum[0] = 0; // Liste der Summen einer gefundenen Primzahl bis zur Wurzel dr Grenzzahl
            let prim; // logische Statusletiable, Hilfsletiable
            let c_o_wurzel = Math.floor(Math.sqrt(c_o)) + 1;	// Nur Primzahlen bis zur Wurzel

            for (let i = 3; i < c_o; i++) {

                k = 0;
                prim = true;  // Status wird erst einmal auf wahr gesetzt

                while ((k < pmax) && prim && p[k] <= c_o_wurzel) {

                    while (psum[k] < i) { // prüfen, ob eine gefundene Primzahl an Stelle k Teiler von i ist

                        psum[k] = psum[k] + p[k];
                    } // durch fortlaufende Aufsummierung der Primzahl an Stelle k zur Summe an Stelle k

                    if (psum[k] === i) { prim = false; } // wenn eine Primzahl an einer Stelle k Teiler von i ist, ist i nicht prim
                    k++; // die nächst größere Primzahl aus dem Summenarray wird geprüft
                } // alle Primzahlen bis zur Wurzel von i sind geprüft
                if (prim) {

                    pmax++; // Array-Zeiger erhöhen
                    p[pmax] = i; // neue Primzahl am Ende eintragen
                    psum[pmax] = 0; // an gleicher Stelle Summenelement schaffen
                }
            }

            return false;
        },

        eratosthenes(c_max: number) {

            let p_eras; p_eras = new Array();
            let index = 0;
            let primSieb = new Array();
            primSieb[0] = false; primSieb[1] = false;

            for (let i = 2; i <= c_max; i++) {

                primSieb[i] = true;
            }

            for (let i = 2; i <= c_max; i++) {

                let hv = c_max / i;
                index = i;

                for (let j = 2; j <= hv; j++) {

                    index = index + i; // entspricht primSieb[i*j]=0;
                    primSieb[index] = false;
                }

            }

            for (let i = 2; i <= c_max; i++) {

                if (primSieb[i] === true) { p_eras.push(i); }
            }

            return false;
        },

        probedivision(c_max: number) {

            let p_modulo; p_modulo = new Array(2, 3, 5, 7);
            let i, j, hv, c_wurzel;

            for (i = 11; i <= c_max; i++) {

                c_wurzel = Math.floor(Math.sqrt(i)) + 1; // floor() rundet ab

                for (j = 0; j <= c_wurzel; j++) {

                    hv = p_modulo[j];

                    if (hv > c_wurzel) {

                        p_modulo.push(i);
                        break;
                    }

                    if (i % hv === 0) { break; }
                }

            }

            return false;
        },

        modulo_trivial(c_max: number): boolean {

            let p_modulo1 = [2, 3, 5, 7];
            let i, j;

            for (i = 11; i <= c_max; i++) {

                let c_wurzel = Math.floor(Math.sqrt(i)) + 1; // floor() rundet ab

                for (j = 2; j <= c_wurzel; j++) {

                    if (i % j === 0) { break; }
                    if (j === c_wurzel) { p_modulo1.push(i); }

                }

            }

            return false;
        }

    };

    /** Ratio - Aspekt / Golden */
    ratio = {

        aspect: {

            _4to3: 0,
            _16to9: 0
        },

        golden: {

            /** Golden Ratio Main Calculator
             * @param main Main golden ratio segment
             * @return `IGoldenRatio`: {`main`:`number`, `major`:`number`, `minor`:`number`}
             */
            main(main: number): IGoldenRatio {

                if (isNaN(main)) { return; }

                let major = main / PHI,
                    minor = main - major;

                return { main, major, minor };
            },

            /** Golden Ratio Major Calculator
             * @param major Major golden ratio segment
             * @return `IGoldenRatio`: {`main`:`number`, `major`:`number`, `minor`:`number`}
             */
            major(major: number): IGoldenRatio {

                if (isNaN(major)) { return; }

                let main = major * PHI,
                    minor = main - major;

                return { main, major, minor };
            },

            /** Golden Ratio Minor Calculator
             * @param minor Minor golden ratio segment
             * @return `IGoldenRatio`: {`main`:`number`, `major`:`number`, `minor`:`number`}
             */
            minor(minor: number): IGoldenRatio {

                if (isNaN(minor)) { return; }

                let major = minor * PHI,
                    main = minor + major;

                return { main, major, minor };
            }

        }

    };

    /** Sqaure² bench */
    square = {

        expo: (n: number): number => { return n ** 2; },

        multi: (n: number): number => { return n * n; },

        power: (n: number): number => { return Math.pow(n, 2); },

        bitShiftRecursive(n: number): number {

            if (n === 0) { return 0; }

            n = Math.abs(n);
            let x = n >> 1;
            // If is odd
            if (n & 1) { return ((this.squareBitShiftRecursice(x) << 2) + (x << 2) + 1); }
            // even
            return (this.squareBitShiftRecursice(x) << 2);
        }

    };

    /** Triangle -  */
    triangle = {

        /** Pythagoras theorem
         * @description Often called the "Pythagorean equation".
         *  States that the square of the hypotenuse is equal to the sum of the squares of the other two sides.
         *  The theorem can be written as an equation relating the lengths of the catheti `a`, `b` and hypotenuse `c`.
         *#   ƒ(c²) = a² + b²
         **     `a`: Length of the adjacent cathetus
         **     `b`: Length of the opposite cathetus
         **     `c`: Length of the hypotenuse
         * @param triRight `{ adjacent, opposite, hypotenuse }` wich one of the parameter must be `undefined`.
         */
        pythagoras(triRight: ITheoremPythagoras): ITriangle {

            let adjacent = triRight.adjacent,
                opposite = triRight.opposite,
                hypotenuse = triRight.hypotenuse;

            if (!adjacent) {
                // √( a² = c² - b² )
                adjacent = Math.sqrt((hypotenuse ** 2) - (opposite ** 2));
                return { adjacent, opposite, hypotenuse };
            }
            if (!opposite) {
                // √( b² = c² - a² )
                opposite = Math.sqrt((hypotenuse ** 2) - (adjacent ** 2));
                return { adjacent, opposite, hypotenuse };
            }
            // √( c² = a² + b² )
            hypotenuse = Math.sqrt((adjacent ** 2) + (opposite ** 2));
            return { adjacent, opposite, hypotenuse };
        },

        plain: {

            /** Triangle - Gegeben: Zwei Seiten a, b und Winkel y
             * @param ankathete Side a
             * @param gegenkathete Side b
             * @return β angle in Radiant
             */
            AradC_AnkaGegen(a: number, b: number, gammaDeg: number): number {

                let c = Math.sqrt(a ** 2 + b ** 2 - (2 * a * b * (Math.cos(gammaDeg))));
                let alphaRad = Math.asin(a * Math.sin(gammaDeg));
                return c;
            },

            /** Triangle - Gegeben: Winkel ß, y und Seite c
             * @param c Side c
             * @param gammaDeg y angle in Radiant
             * @param betaDeg β angle in Radiant
             */
            AradB_AnkaGegen(c: number, gammaDeg: number, betaDeg: number): number {

                let b = ((c * Math.sin(betaDeg)) / Math.sin(gammaDeg));
                let alphaDeg = 180 - gammaDeg - betaDeg;
                let a = (b * Math.sin(alphaDeg)) / Math.sin(betaDeg);
                return c;
            },

            /** Triangle - Gegeben: Winkel ß, y und Seite c
             * @param c Side c
             * @param gammaDeg y angle in Radiant
             * @param betaDeg β angle in Radiant
             */
            AradBradYrad_AnkaGegen(c: number, a: number, b: number): number {

                let Adeg = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * a * b));
                let BDeg = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * b * c));
                let Ydeg = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));
                return c;
            }

        },

        right: {

            /** Right Triangle - Gegeben: Gegenkathete b & Winkel α in Radiant
             * @param adjacent Side a
             * @param alphaRad Angle α in Radiant
             * @return Ankathete side a
             */
            Anka_GegenArad(gegenkathete, alphaRad) { return gegenkathete / Math.tan(alphaRad); },

            /** Right Triangle - Gegeben: Gegenkathete b & Winkel α in Radiant
             * @param gegenkathete Side a
             * @param alphaRad Angle α in Radiant
             * @return Hypothenuse side c
             */
            Hypo_GegenArad(gegenkathete, alphaRad) { return gegenkathete / Math.sin(alphaRad); },

            /** Right Triangle - Gegeben: Ankathete a & Angle α in Radiant
             * @param ankathete Side a
             * @param alphaRad Angle α in Radiant
             * @return Gegenkathete side b
             */
            Gegen_AnkaArad(ankathete, alphaRad): number { return ankathete * Math.tan(alphaRad); },

            /** Right Triangle - Gegeben: Ankathete a & Angle α in Radiant
             * @param ankathete Side a
             * @param alphaRad Angle α in Radiant
             * @return Hypothenuse side c
             */
            Hypo_AnkaGegen(ankathete, alphaRad): number { return ankathete / Math.cos(alphaRad); },

            /** Right Triangle - Gegeben: Ankathete a und Hypotenuse c
             * @param ankathete Side a
             * @param hypothenuse Side c
             * @return α angle in Radiant
             */
            Arad_AnkaHypo(ankathete, hypothenuse): number { return Math.acos(ankathete / hypothenuse); },

            /** Right Triangle - Gegeben: Katheten a, b
             * @param ankathete Side a
             * @param gegenkathete Side b
             * @return α angle in Radiant
             */
            Arad_AnkaGegen(ankathete: number, gegenkathete: number): number { return Math.atan(gegenkathete / ankathete); },
            cArctangent_AnkaGegen(ankathete: number, gegenkathete: number): number { return Math.atan2(gegenkathete, ankathete); },

            /** Right Triangle - Gegeben: Katheten a, b
             * @param ankathete Side a
             * @param gegenkathete Side b
             * @return β angle in Radiant
             */
            Brad_AnkaGegen(ankathete: number, gegenkathete: number): number { return Math.atan(ankathete / gegenkathete); }

        }

    };

    euclid = {

        rekursive: (a, b) => {

            if (b === 0) { return a; }
            if (a === 0) { return b; } 
            if (a > b) { return this.euclid.rekursive(a - b, b); }
            return this.euclid.rekursive(a, b - a);
        },

        iterative(a, b) {

            if (a === 0) { return b; }

            while (b !== 0) {

                if (a > b) {
                    a -= b;
                    continue;
                }
                b -= a;
            }
            return a;
        },

        // Modern Variantions

        rekursive_modern: (a, b) => {

            if (b === 0) { return a; }
            return this.euclid.rekursive_modern(b, a % b);
        },

        iterative_modern(a, b) {

            let tmp = 0;
            while (b !== 0) {
                tmp = a % b;
                a = b;
                b = tmp;
            }
            return a;
        }

    };

    constructor() { }

}
let m = new MathUtilsService();
export default m;


export const utils = {

    /** Clamp a value to Min/Max
     * @example if(n < min) return min;
     *          if(n > max) return max;
     *          return value;
     */
    clamp: (n: number, min: number, max: number): number => Math.min(Math.max(n, Math.min(min, max)), Math.max(min, max)),

    /** Lock a value to Min/Max.
     * @description Check whether a value has gone off Min/Max (canvas edges).
     *     If so, it makes the value wrap around to the opposite.
     * @example -  Min  Val   Max
     *            -5    x    23
     *       Max ←|____|____|→ Min
     */
    lock: (n: number, min: number, max: number): number => {

        if (n > min && n < max) { return n; }
        if (n > max) { return min; }
        return max;
    },

    /** Linear Normalization convert a value from a range into a normed value between 0-1
     * @example  Min  Val    Max
     *           4    x      23  ← param x, min, max
     *           |____|______|
     *           |    |      |
     *           0    ?      1   ← return
     * Hint: Math.min() & Math.max()
     */
    norm: (value: number, minimum: number, maximum: number): number => ((value - minimum) / (maximum - minimum)),

    /** Linear Interpolation does the opposite of normalization
     * @example Min  Val    Max
     *          0    x      1     ←  x, min, max
     *          |____|______|
     *          |    |      |
     *          0    ?      10    ← return
     */
    lerp: (normed: number, minimum: number, maximum: number): number => ((maximum - minimum) * normed + minimum),

    /** Convert a value from one scale into another scale
     * @example Min   Val    Max
     *          src   x      src  ← params = x, src & dst min/max
     *          |_____|______|
     *          |     |      |
     *          dst   ?      dst  ← return
     */
    map: (val: number, srcMin: number, srcMax: number, destMin: number, destMax: number): number => this.lerp(this.norm(val, srcMin, srcMax), destMin, destMax),

    /**
     *  let dx = p1.x - p0.x,
     *  dy = p1.y - p0.y;
     *  return √c² = a² + b²
     *  // Hint: p1 for mouse.event.Client X/Y
     */
    distancePoints: (p0: IPoint, p1: IPoint): number => Math.sqrt(((p1.x - p0.x) ** 2) + ((p1.y - p0.y) ** 2)),

    /*
        let dx = x1 - x0,
            dy = y1 - y0;
        // √c² = a² + b³
        return Math.sqrt((dx ** 2) + (dy ** 2));
        // return this.pythagoras(dis).hypothenuse;
     */
    distanceXY: (x0: number, y0: number, x1: number, y1: number): number => Math.sqrt(((x1 - x0) ** 2) + ((y1 - y0) ** 2)),

    /** Radians / Degrees converter
     * @description 1rad ≈ 57.29577951° or 17' or 45"
     * @example ƒ(deg) = rad × (180 / π)
     */
    rad2deg: (rad: number): number => rad * 180 / Math.PI,

    /** Degrees / Radians converter
     * @description 1deg ≈ 0,017453293rad or 180° =	π ≈ 3.14159265359...
     * @example ƒ(rad) = deg × (π / 180)
     */
    deg2rad: (deg: number): number => deg * Math.PI / 180,

    loop: (index: number, length: number) => ++index % length,

    circleCollision: (c0, c1) => utils.distancePoints(c0, c1) <= c0.radius + c1.radius,

    circlePointCollision: (x, y, circle) => utils.distanceXY(x, y, circle.x, circle.y) < circle.radius,

    pointInRect: (x, y, rect) => utils.inRange(x, rect.x, rect.x + rect.width) && utils.inRange(y, rect.y, rect.y + rect.height),

    inRange: (value, min, max) => value >= Math.min(min, max) && value <= Math.max(min, max),

    rangeIntersect: (min0, max0, min1, max1) => Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1),

    rectIntersect: (r0, r1) => utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) && utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height),

    randomInt: (min, max) => Math.floor(min + Math.random() * (max - min + 1)),

    randomRange: (min, max) => min + Math.random() * (max - min),

    roundNearest: (value, nearest) => Math.round(value / nearest) * nearest,

    roundToPlaces: (value, places) => {

        let mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    }

};


export const lookups = {

    // Eulerische Konstante γ: 100 Nachkommastellen
    y: `0,57721 56649 01532 86060 65120 90082 40243 10421 59335 93992 35988 05767 23488 48677 26777 66467 09369 47063 29174 67495`,

    // Eulerische Zahl e: 1000 Nachkommastellen
    e: `2,71828 18284 59045 23536 02874 71352 66249 77572 47093 69995 95749 66967 62772 40766 30353 54759 45713 82178 52516 64274
          27466 39193 20030 59921 81741 35966 29043 57290 03342 95260 59563 07381 32328 62794 34907 63233 82988 07531 95251 01901
          15738 34187 93070 21540 89149 93488 41675 09244 76146 06680 82264 80016 84774 11853 74234 54424 37107 53907 77449 92069
          55170 27618 38606 26133 13845 83000 75204 49338 26560 29760 67371 13200 70932 87091 27443 74704 72306 96977 20931 01416
          92836 81902 55151 08657 46377 21112 52389 78442 50569 53696 77078 54499 69967 94686 44549 05987 93163 68892 30098 79312
          77361 78215 42499 92295 76351 48220 82698 95193 66803 31825 28869 39849 64651 05820 93923 98294 88793 32036 25094 43117
          30123 81970 68416 14039 70198 37679 32068 32823 76464 80429 53118 02328 78250 98194 55815 30175 67173 61332 06981 12509
          96181 88159 30416 90351 59888 85193 45807 27386 67385 89422 87922 84998 92086 80582 57492 79610 48419 84443 63463 24496
          84875 60233 62482 70419 78623 20900 21609 90235 30436 99418 49146 31409 34317 38143 64054 62531 52096 18369 08887 07016
          76839 64243 78140 59271 45635 49061 30310 72085 10383 75051 01157 47704 17189 86106 87396 96552 12671 54688 95703 50354`,

    // Factorials: 100 
    factorials: [
        1,
        2,
        6,
        24,
        120,
        720,
        5040,
        40320,
        362880,
        3628800,
        39916800,
        479001600,
        6227020800,
        87178291200,
        1307674368000,
        20922789888000,
        355687428096000,
        6402373705728000,
        121645100408832000,
        2432902008176640000,
        51090942171709440000,
        1124000727777607680000,
        25852016738884976640000,
        620448401733239439360000,
        15511210043330985984000000,
        403291461126605635584000000,
        10888869450418352160768000000,
        304888344611713860501504000000,
        8841761993739701954543616000000,
        265252859812191058636308480000000,
        8222838654177922817725562880000000,
        263130836933693530167218012160000000,
        8683317618811886495518194401280000000,
        295232799039604140847618609643520000000,
        10333147966386144929666651337523200000000,
        371993326789901217467999448150835200000000,
        13763753091226345046315979581580902400000000,
        523022617466601111760007224100074291200000000,
        20397882081197443358640281739902897356800000000,
        815915283247897734345611269596115894272000000000,
        33452526613163807108170062053440751665152000000000,
        1405006117752879898543142606244511569936384000000000,
        60415263063373835637355132068513997507264512000000000,
        2658271574788448768043625811014615890319638528000000000,
        119622220865480194561963161495657715064383733760000000000,
        5502622159812088949850305428800254892961651752960000000000,
        258623241511168180642964355153611979969197632389120000000000,
        12413915592536072670862289047373375038521486354677760000000000,
        608281864034267560872252163321295376887552831379210240000000000,
        30414093201713378043612608166064768844377641568960512000000000000,
        1551118753287382280224243016469303211063259720016986112000000000000,
        80658175170943878571660636856403766975289505440883277824000000000000,
        4274883284060025564298013753389399649690343788366813724672000000000000,
        230843697339241380472092742683027581083278564571807941132288000000000000,
        12696403353658275925965100847566516959580321051449436762275840000000000000,
        710998587804863451854045647463724949736497978881168458687447040000000000000,
        40526919504877216755680601905432322134980384796226602145184481280000000000000,
        2350561331282878571829474910515074683828862318181142924420699914240000000000000,
        138683118545689835737939019720389406345902876772687432540821294940160000000000000,
        8320987112741390144276341183223364380754172606361245952449277696409600000000000000,
        507580213877224798800856812176625227226004528988036003099405939480985600000000000000,
        31469973260387937525653122354950764088012280797258232192163168247821107200000000000000,
        1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000,
        126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000,
        8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000,
        544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000,
        36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000,
        2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000,
        171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000,
        11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000,
        850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000,
        61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000,
        4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000,
        330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000,
        24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000,
        1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000,
        145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000,
        11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000,
        894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000,
        71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000,
        5797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000,
        475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000,
        39455239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000,
        3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000,
        281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000,
        24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000,
        2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000,
        185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000,
        16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000,
        1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000,
        135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000,
        12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000,
        1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000,
        108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000,
        10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000,
        991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000,
        96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000,
        9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000,
        933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000,
        93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000
    ],

    // Fibonacci: 79 
    fibonaccis: [
        0,
        1,
        1,
        2,
        3,
        5,
        8,
        13,
        21,
        34,
        55,
        89,
        144,
        233,
        377,
        610,
        987,
        1597,
        2584,
        4181,
        6765,
        10946,
        17711,
        28657,
        46368,
        75025,
        121393,
        196418,
        317811,
        514229,
        832040,
        1346269,
        2178309,
        3524578,
        5702887,
        9227465,
        14930352,
        24157817,
        39088169,
        63245986,
        102334155,
        165580141,
        267914296,
        433494437,
        701408733,
        1134903170,
        1836311903,
        2971215073,
        4807526976,
        7778742049,
        12586269025,
        20365011074,
        32951280099,
        53316291173,
        86267571272,
        139583862445,
        225851433717,
        365435296162,
        591286729879,
        956722026041,
        1548008755920,
        2504730781961,
        4052739537881,
        6557470319842,
        10610209857723,
        17167680177565,
        27777890035288,
        44945570212853,
        72723460248141,
        117669030460994,
        190392490709135,
        308061521170129,
        498454011879264,
        806515533049393,
        1304969544928657,
        2111485077978050,
        3416454622906707,
        5527939700884757,
        8944394323791464
    ],

    primes: [1, 2, 3, 5, 7, 9, 11, 13, 17, 19],
    wieferichs: [1093, 3511],
    wilsons: [5, 13, 563]

}


/*********************    Just My Notes    *********************/

/** How 2 Numbers
 * @example
 * let binNum = 0b1101;           // Binary
 * let octNum = 0o17;             // Octal
 * let hexNum = 0xf4;             // Hexadecimal
 *
 * let num4 = Number('');         // → 0
 * let num1 = Number('123');      // → 123
 * let num2 = Number('12.3');     // → 12.3
 * let num3 = Number('123e-1');   // → 12.3
 * let num6 = Number('0b11');     // → 3
 * let num7 = Number('0o11');     // → 9
 * let num5 = Number('0x11');     // → 17
 *
 * let deci = 0xf7.toString(10);  // Convert number to decimal string
 * let binary = 8..toString(2);   // Convert number to binary string
 * let octal = 12..toString(8);   // Convert number to octal string
 * let hex = 34..toString(16);    // Convert number to hexadecimal string
 *
 * let deci = parseInt(hex, 16);  // Convert hexadecimal string to int
 */
export function nlg_alpha() { }

/** V8 NOTES
 * @example
 * const max = Number.MAX_SAFE_INTEGER;
 * //        → 9 007 199 254 740 991
 *
 * // Highest possible BigInt value that can be represented as a signed 64-bit integer.
 * const max = 2n ** (64n - 1n) - 1n;
 * BigInt.asIntN(64, max);
 * //        → 9 223 372 036 854 775 807n
 *
 * BigInt.asIntN(64, max + 1n);
 * //        → -9 223 372 036 854 775 808n
 * //          ^ negative, cuz of overflow
 */
export function nlg_bravo() { }

/** Access array iterators
 * @description How2 access an array iterator,
 *              for anything that implements the iterable protocol
 * @example
 * let arr = [1,2,3];
 * let foo = arr[Symbol.iterator]();
 *
 * arr.forEach(() => console.log(foo.next()));
 *
 * console.log(foo.next());
 * // → { value: 1, done: false }
 * // → { value: 2, done: false }
 * // → { value: 3, done: false }
 * // → { value: undefined, done: true }
 */
export function nlg_charlie() { }

/** Allgemeines (schiefwinkliges) Dreieck
 * @description Definition:
 * Wesentlich für die Berechnungen sind der Kosinus- und der Sinussatz, sowie die Beziehungen der Winkelfunktionen.
 * @example
 * // Sinussatz
 *      asin(α) = b sin(β) = csin(γ)
 * // Kosinussatz
 *      a2 = b2 + c2 − 2bc cos(α)
 *      b2 = a2 + c2 − 2ac cos(β)
 *      c2 = a2 + b2 − 2ab cos(γ)
 * // Projektionssatz
 *      c = a ⋅ cos(β) + b ⋅ cos(α)
 * // Tangensformel
 *      tan(γ) = c ⋅ sin(α) b − c ⋅ cos(α) = c ⋅ sin(β) a − c ⋅ cos(β)
 * // Umkreisradius r
 *      r = s4 ⋅ cos(α 2) ⋅ cos(β 2) ⋅ cos(γ 2)
 * // mit
 *      s = 12(a + b + c)
 * // Inkreisradius ρ
 *           ____________________
 *      ρ = √((s−a) (s−b) (s−c) s
 * // Höhe hc auf c
 *      hc = a * sin(β) = b * sin(α)
 * // Fläche A
 *      A = 1/2 * a * b * sin(γ)
 * // Heronische Flächenformel
 *                _________________
 *      A = ρs = √(s−a) (s−b) (s−c)
 * // Eigenschaften trigonometrischer Funktionen
 * // Reduktionsformeln (in Grad)
 *   sin(90°+x)  = cos(x)
 *   cos(90°+x)  = −sin(x)
 *   tan(90°+x)  = −cot(x)
 *   cot(90°+x)  = −tan(x)
 *   sin(180°+x) = −sin(x)
 *   cos(180°+x) = −cos(x)
 *   tan(180°+x) = tan(x)
 *   cot(180°+x) = cot(x)
 * // Zusammhang der trigonometrischen Funktionen bei gleichem Argument
 *   sin(x)² + cos(x)² = 1
 *   sin(x)  / cos(x)  = tan(x)
 * // Additionstheoreme der trigonometrischen Funktionen
 *   sin(x±y) = sin(x)    cos(y)     ± cos(x)  sin(y)
 *   cos(x±y) = cos(x)    cos(y)     ± sin(x)  sin(y)
 *   tan(x±y) = tan(x)  ± tan(y) / 1 ± tan(x)  tan(y)
 */
export function nlg_delta() { }

/** Right-Triangle ⊿
 * @description Die Seiten a und b des rechtwinkligen Dreiecks, die den rechten Winkel einschließen sind die Katheten.
 *              Die dem rechten Winkel gegenüber liegende Seite c ist die Hypotenuse.
 *              Betrachtet man den Winkel α so ist die Seite a die Ankathete und b die Gegenkathete.
 * @example Angle ƒ:
 *           sin(α) = cos(β) = b / c
 *           cos(α) = sin(β) = a / c
 *           tan(α) = cos(β) = b / a
 */
export function nlg_echo() { }

/** Masked Numbers
 * @example const str1 = '5';
 * console.log(str1.padStart(3, '0'));
 * // expected output: "005"
 * const fullNumber = '2034399002125581';
 * const last4Digits = fullNumber.slice(-4);
 * const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
 * console.log(maskedNumber);
 * // expected output: "************5581"
 *
 * console.log((21..toString(2).padStart(9, '0')));
 * console.log((33..toString(2).padStart(9, '0')));
 */
export function nlg_foxtrot() { }

/* Binary 2 String */
export function nlg_golf(txt: string) {
    return txt.replace(/\s*[01]{8}\s*/g, (bin) => {
        return String.fromCharCode(parseInt(bin, 2));
    });
}
