
export interface IMatrix2D {
    get2D: (x: number, y: number, cols: number) => number;
    set2D: (x: number, y: number, cols: number, val: any) => void;
}

export interface IMatrix3D {
    get3D: (x: number, y: number, z: number, cols: number, deeps: number) => number;
    set3D: (x: number, y: number, z: number, cols: number, deeps: number, val: any) => void;
}

export interface IMatrix extends IMatrix2D, IMatrix3D { };

export class NLGMathService {

    constructor() { }

}

let m = new NLGMathService();
export default m;
