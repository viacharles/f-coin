export interface IEvent<T> {
  action: T;
  [key: string]: any;
}
