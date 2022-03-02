import { IEvent } from '@utility/interface/common.interface';

export enum ChatAction {
  FetchChatHistory = 1,
  ReadMessage,
  SendMessage,
  CreateSocket,
  CloseSocket
}

export interface IChatEvent extends IEvent<ChatAction> {
  id?: string;
  friendId?: string;
  message?: string;
  messageIds?: string[];
}

