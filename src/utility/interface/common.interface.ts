export interface IEvent<T> {
  action: T;
  [key: string]: any;
}

export interface IPosition {
  x?: number;
  y?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface IUploadDialog {
  files: FileList;
}
