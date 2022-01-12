import { ICoinInfo } from '@utility/interface/businessCenter.interface';
import { IEvent } from '@utility/interface/common.interface';


export enum CoiningAction {
  FetchCoinInfo = 1,
  FetchFriendList,
  UpdateCoinInfo,
  StartDigging,
  EndDigging
}

export interface ICoiningEvent extends IEvent<CoiningAction> {
  id?: string;
  info?: ICoinInfo;
  isLoading?: boolean;
}

export class CoinInfo implements ICoinInfo {
  public isDigging;
  public lastStopDate;
  public totalAmount;
  constructor({ isDigging, lastStopDate, totalAmount }: ICoinInfo) {
    this.isDigging = isDigging;
    this.lastStopDate = lastStopDate;
    this.totalAmount = totalAmount;
  }

  public updateInfo({ isDigging, lastStopDate, totalAmount }: ICoinInfo): void {
    this.isDigging = isDigging === undefined ? this.isDigging : isDigging;
    this.lastStopDate = lastStopDate === undefined ? this.lastStopDate : lastStopDate;
    this.totalAmount = totalAmount === undefined ? this.totalAmount : totalAmount;
  }

  /**
   * @description 取得coin info database格式
   */
  public getData(): ICoinInfo {
    return {
      isDigging: this.isDigging,
      lastStopDate: this.lastStopDate,
      totalAmount: this.totalAmount
    }
  }
}

