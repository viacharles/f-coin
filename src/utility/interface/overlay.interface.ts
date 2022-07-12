import { EAction, ESize } from "@utility/enum/common.enum";

export interface IOverlayCallbacks {
  confirm: (params?: any) => any | void;
  cancel: (params?: any) => any | void;
  backdrop: (dialog: IDialog<any>) => void;
  [key: string]: (params?: any) => any | void;
}

export interface IDialog<T = any> {
  component: any;
  id: string;
  params: IOverlay<T>;
}

export interface IOverlay<T = any> {
  config?: T;
  callbacks?: IOverlayCallbacks;
  size?: ESize.Small | ESize.Middle | ESize.Large | ESize.XL;
  options?: {
    backdrop?: boolean;
    backdropClose?: boolean;
    backdropTransParent?: boolean;
    isAside?: boolean
  }
}

export interface ILoading {
  id: string;
  action: EAction.Add | EAction.Delete | EAction.Clear;
}
