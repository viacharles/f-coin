import { IEvent } from '@utility/interface/common.interface';

export enum ChatAction {
  FetchChatHistory = 1,
}

export interface IChatEvent extends IEvent<ChatAction> {
  id?: string;
}
