import { IMessage } from '@utility/interface/messageCenter.interface';
import { IEvent } from '@utility/interface/common.interface';

export enum ChatAction {
  FetchChatHistory = 1,
  SendMessage,
  CreateSocket,
  CloseSocket
}

export interface IChatEvent extends IEvent<ChatAction> {
  id?: string;
  friendId?: string;
  message?: string;
}

