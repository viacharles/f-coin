export interface IEvent<T> {
  action: T;
  [key: string]: any;
}

export interface IPosition {
  x?: number;
  y?: number;
  clientX?: number;
  clientY?: number;
  offsetX?: number;
  offsetY?: number;
}