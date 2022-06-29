export interface IEvent<T> {
  action: T;
  [key: string]: any;
}

export interface IMove {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

export interface IDragMove {
  start: IMove;
  move: IMove;
  end: IMove;
}

