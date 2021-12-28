import { ICoinInfo } from '@utility/interface/businessCenter.interface';
import { IEvent } from '@utility/interface/common.interface';
import firebase from 'firebase';

export enum CoiningAction {
  FetchCoinInfo = 1,
  MiningStart,
  MiningEnd,
}

export interface ICoiningEvent extends IEvent<CoiningAction> {
  id?: string;
}

export class CoinInfo implements ICoinInfo {
  public isDigging: boolean;
  public lastStopDate: firebase.firestore.Timestamp;
  public totalAmount: number;
  constructor({ isDigging, lastStopDate, totalAmount }: ICoinInfo) {
    this.isDigging = isDigging;
    this.lastStopDate = lastStopDate;
    this.totalAmount = totalAmount;
  }
}

