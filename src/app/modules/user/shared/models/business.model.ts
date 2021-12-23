import { IEvent } from "@utility/interface/common.interface";

export enum CoiningAction {
  miningStart = 1,
  miningEnd,
}

export interface ICoiningEvent extends IEvent<CoiningAction> {
  id?: string;
}
