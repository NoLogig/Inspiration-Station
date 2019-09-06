
export interface IMatrix2D {
    get2D: (x: number, y: number, cols: number) => number;
}

export interface IMatrix3D {
    get3D: (x: number, y: number, z: number, cols: number, deeps: number) => number;
}

export interface IMatrix extends IMatrix2D, IMatrix3D {};

export class NLGMathService {

    constructor() { }

}

let m = new NLGMathService();
export default m;
