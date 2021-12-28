import { IEvent } from "@utility/interface/common.interface";

export enum CoiningAction {
  FetchBusinessStatus = 1,
  MiningStart,
  MiningEnd,
}

export interface ICoiningEvent extends IEvent<CoiningAction> {
  id?: string;
}
