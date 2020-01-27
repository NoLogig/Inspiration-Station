export interface IPoint {
    
    x: number;
    y: number;

    z?: number;
}

export interface IParticle extends IPoint {

    vx: number;
    vy: number;

    vz?: number;
}
export interface IPhysics {

    mass?: number;
    bounce?: number;
    friction?: number;
    gravity?: number;

    springs?: ISpring[];
    gravitations?: IPhysicParticle[];
}
export interface IPhysicParticle extends IParticle, IPhysics { }

export interface IVector extends IPoint {

    angle: number;
    lenght: number;

    getX(): number;
    setX(n: number): void;
    getY(): number;
    setY(n: number): void;

    getZ?(): number;
    setZ?(n: number): void;

    getAngle(): number;
    setAngle(angle: number): void;

    getLength(): number;
    setLength(length: number): void;

    addTo(vec2: number): void;
    subtractFrom(vec2: number): void;
    multiplyBy(vec2: number): void;
    divideBy(vec2: number): void;
}
export interface ISpring extends IPoint {

    k: number;
    length: number;
    
    point?: IPoint;
}

export interface ICircle {

    r: number;
    d?: number;

    U?: number;
    V?: number;
    
    U3D?: number;
    V3D?: number;
}
export interface ICirclePoint extends IPoint, ICircle { }
export interface ICircleParticle extends IParticle, ICircle { }
export interface ICirclePhysicalParticle extends IPhysicParticle, ICircle { }

export interface IRectangle {

    w: number;
    h: number;

    dia?: number;
    m?: IPoint;

    U?: number;
    V?: number;

    U3D?: number;
    V3D?: number;
}
export interface IRectPoint extends IPoint, IRectangle { }
export interface IRectParticle extends IParticle, IRectangle { }
export interface IRectPhysicalParticle extends IPhysicParticle, IRectangle { }

export interface ITriangle {

    adjacent: number;
    opposite: number;
    hypotenuse: number;

    alpha?: number;
    beta?: number;
    gamma?: number;
    
    A?: IPoint;
    B?: IPoint;
    C?: IPoint;

    hA?: number;
    hB?: number;
    hC?: number;
    m?: IPoint;

    U?: number;
    V?: number;
    
    U3D?: number;
    V3D?: number;
}
export interface ITriPoint extends IPoint, ITriangle { }
export interface ITriParticle extends IParticle, ITriangle { }
export interface ITriPhysicalParticle extends IPhysicParticle, ITriangle { }


export interface IGoldenRatio {

    main: number;
    major: number;
    minor: number;
}


export interface IRGBA {

    r: number;
    g: number;
    b: number;

    rgb?: string;
    
    a?: number;
    rgba?: string;
}


export type ITheoremPythagoras = { adjacent: number,    opposite: undefined, hypotenuse: number }
                               | { adjacent: undefined, opposite: number,    hypotenuse: number }
                               | { adjacent: number,    opposite: number,    hypotenuse: undefined }
                               | { adjacent: number,    opposite: number,    hypotenuse: number };
