import { EAction, ESize } from "@utility/enum/common.enum";

export interface IOverlayCallbacks {
  confirm: (params?: any) => any | void,
  cancel: (params?: any) => any | void,
  backdrop: (dialog: IDialog<any>) => void,
  [key: string]: (params?: any) => any | void,
}

export interface IDialog<T = any> {
  component: any,
  id: string,
  params: IOverlay<T>
}

export interface IOverlay<T = any> {
  config?: T;
  callbacks?: IOverlayCallbacks;
  size?: ESize;
  options?: {
    backdrop?: boolean;
    backdropClose?: boolean;
    isAside?: boolean;
    location?: {x: number, y: number};
  };
}

export interface ILoading {
  id: string;
  action: EAction.Add | EAction.Delete | EAction.Clear;
}
