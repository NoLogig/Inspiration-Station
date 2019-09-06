export interface IDatabaseResponse<T> {
  error: IDatabaseError;
  data?: T;
}

export interface IDatabaseError {
  code?: number;
  message: string;
}

export interface IReadResponse {
  uid: string;
  [x: string]: any;
}

export interface ICreateResponse {
  uid: string;
  createTime: Date;
  [x: string]: any;
}

export interface IUpdateResponse {
  uid: string;
  updateTime: Date;
  [x: string]: any;
}


