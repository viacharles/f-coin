/**
 * @description 聊天紀錄介面
 */
export interface IMessage {
  id: string;
  message: string;
  isRead: boolean;
  sendTime: string;
  userId: string;
}

/**
 * @description 使用者訊息中心介面
 */
export interface IMessageCenter {
  history: {
    [key: string]: IMessage;
  };
}
