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

  /**
   * Radians / Degrees converter
   * @description 1rad ≈ 57.29577951° or 17' or 45"
   * @example ƒ(deg) = rad × (180 / π)
   */
  rad2deg(rad: number): number { return rad * DEG; }

  /**
   * Degrees / Radians converter
   * @description 1deg ≈ 0,017453293rad or 180° =	π ≈ 3.14159265359...
   * @example ƒ(rad) = deg × (π / 180)
   */
  deg2rad(deg: number): number { return deg * RAD; }

  /**
   * Pythagoras' theorem
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

    let { adjacent, opposite, hypotenuse } = triRight;

    if (!adjacent) {
      // a = √(c² - b²)
      adjacent = Math.sqrt((hypotenuse ** 2) - (opposite ** 2));
      return { adjacent, opposite, hypotenuse };
    }

    if (!opposite) {
      // b = √(c² - a²)
      opposite = Math.sqrt((hypotenuse ** 2) - (adjacent ** 2));
      return { adjacent, opposite, hypotenuse };
    }
    // c = √(a² + b²)
    hypotenuse = Math.sqrt((adjacent ** 2) + (opposite ** 2));
    return { adjacent, opposite, hypotenuse };
  }

    /** Right Triangle - Gegeben: Gegenkathete b & Winkel α in Radiant
     * @param gegenkathete Side a
     * @param alphaRad Angle α in Radiant
     * @return Ankathete side a
     */
    triRightAnka_GegenArad(gegenkathete, alphaRad) { return gegenkathete / Math.tan(alphaRad); }

    /** Right Triangle - Gegeben: Gegenkathete b & Winkel α in Radiant
     * @param gegenkathete Side a
     * @param alphaRad Angle α in Radiant
     * @return Hypothenuse side c
     */
    triRightHypo_GegenArad(gegenkathete, alphaRad) { return gegenkathete / Math.sin(alphaRad); }

    /** Right Triangle - Gegeben: Ankathete a & Angle α in Radiant
     * @param ankathete Side a
     * @param alphaRad Angle α in Radiant
     * @return Gegenkathete side b
     */
    triRightGegen_AnkaArad(ankathete, alphaRad): number { return ankathete * Math.tan(alphaRad); }

    /** Right Triangle - Gegeben: Ankathete a & Angle α in Radiant
     * @param ankathete Side a
     * @param alphaRad Angle α in Radiant
     * @return Hypothenuse side c
     */
    triRightHypo_AnkaGegen(ankathete, alphaRad): number { return ankathete / Math.cos(alphaRad); }

    /** Right Triangle - Gegeben: Ankathete a und Hypotenuse c
     * @param ankathete Side a
     * @param hypothenuse Side c
     * @return α angle in Radiant
     */
    triRightArad_AnkaHypo(ankathete, hypothenuse): number { return Math.acos(ankathete / hypothenuse); }

    /** Right Triangle - Gegeben: Katheten a, b
     * @param ankathete Side a
     * @param gegenkathete Side b
     * @return α angle in Radiant
     */
    triRightArad_AnkaGegen(ankathete: number, gegenkathete: number): number { return Math.atan(gegenkathete / ankathete); }
    cArctangent_AnkaGegen(ankathete: number, gegenkathete: number): number { return Math.atan2(gegenkathete, ankathete); }

    /** Right Triangle - Gegeben: Katheten a, b
     * @param ankathete Side a
     * @param gegenkathete Side b
     * @return β angle in Radiant
     */
    triRightBrad_AnkaGegen(ankathete: number, gegenkathete: number): number { return Math.atan(ankathete / gegenkathete); }


    /** Triangle - Gegeben: Zwei Seiten a, b und Winkel y
     * @param ankathete Side a
     * @param gegenkathete Side b
     * @return β angle in Radiant
     */
    triAradC_AnkaGegen(a: number, b: number, gammaDeg: number): number {

        let c = Math.sqrt(a ** 2 + b ** 2 - (2 * a * b * (Math.cos(gammaDeg))));
        let alphaRad = Math.asin(a * Math.sin(gammaDeg));
        return c;
    }

    /** Triangle - Gegeben: Winkel ß, y und Seite c
     * @param c Side c
     * @param gammaDeg y angle in Radiant
     * @param betaDeg β angle in Radiant
     */
    triAradB_AnkaGegen(c: number, gammaDeg: number, betaDeg: number): number {

        let b = ((c * Math.sin(betaDeg)) / Math.sin(gammaDeg));
        let alphaDeg = 180 - gammaDeg - betaDeg;
        let a = (b * Math.sin(alphaDeg)) / Math.sin(betaDeg);
        return c;
    }

    /** Triangle - Gegeben: Winkel ß, y und Seite c
     * @param c Side c
     * @param gammaDeg y angle in Radiant
     * @param betaDeg β angle in Radiant
     */
    triAradBradYrad_AnkaGegen(c: number, a: number, b: number): number {

        let Adeg = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * a * b));
        let BDeg = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * b * c));
        let Ydeg = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));
        return c;
    }

}
