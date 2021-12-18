import { IMessage } from '@utility/interface/messageCenter.interface';
import { IEvent } from '@utility/interface/common.interface';

export enum ChatAction {
  FetchChatHistory = 1,
  SendMessage,
}

export interface IChatEvent extends IEvent<ChatAction> {
  id?: string;
  friendId?: string;
  message?: string;
}

export class ChatMessage {
  constructor({ id, isRead, sendTime, message, userId }: IMessage) {
    this.id = id;
    this.isRead = isRead;
    this.sendTime = sendTime.toDate().toISOString();
    this.message = message;
    this.userId = userId;
  }

  public id: string;
  public isRead: boolean;
  public sendTime: string;
  public message: string;
  public userId: string;
}
