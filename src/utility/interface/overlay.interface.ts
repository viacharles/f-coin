import { IPosition } from '@utility/interface/common.interface';
import { EAction, ESize } from "@utility/enum/common.enum";

export interface IOverlayCallbacks {
  confirm: (params?: any) => any | void,
  cancel: (params?: any) => any | void,
  backdrop: (dialog: IDialog<any>) => void,
  [key: string]: (params?: any) => any | void,
}

export interface IDialog<T = any> {
  component: any;
  id: string;
  params: IOverlay<T>;
}

/**
 * @description 彈窗傳入參數
 * @param classes 彈窗樣式 class 名稱
 * @param backdrop 是否有背景遮罩（無法與背景元件交互）
 */
export interface IOverlay<T = any> {
  config?: T;
  callbacks?: IOverlayCallbacks;
  size?: ESize;
  options?: {
    classes?: string[];
    template?: EOverlayTemplate;
    backdrop?: boolean;
    backdropClose?: boolean;
    isAside?: boolean;
    draggable?: boolean;
    location?: IPosition;
  };
}

export interface ILoading {
  id: string;
  action: EAction.Add | EAction.Delete | EAction.Clear;
}

export enum EOverlayTemplate {
  IsMiniWindow = 'isMiniWindow'
}
