import { IEvent } from '@utility/interface/common.interface';

export enum ECoiningAction {
  fetchMiningHistory = 1,
}

export interface ICoiningEvent extends IEvent<ECoiningAction> {
  id: string;
}
