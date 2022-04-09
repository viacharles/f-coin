import { IMessage } from '@utility/interface/messageCenter.interface';
import { Subscription, Observable, Subject } from 'rxjs';
import {
  ChatAction as Action,
  IChatEvent,
} from '@user/shared/models/chat.model';
import { Injectable } from '@angular/core';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { LoggerService } from '@shared/services/logger.service';
import { MessageService } from '@shared/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends FeatureService<IChatEvent, Action> {
  constructor(
    $logger: LoggerService,
    private $message: MessageService
  ) {
    super($logger);
  }

  private ws = new Subscription();
  /**
   * @description 當前使用者所有聊天紀錄
   */
  private messageHistory = new Subject<IMessage[]>();
  public messageHistory$ = this.messageHistory.asObservable();

  protected featureName = 'Chat';
  protected resolveAction({ action, id, friendId, message, messageIds }: IChatEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchChatHistory:
          this.$message
            .fetchMessageRecord(id as string, friendId as string)
            .then((histories) => {
              this.$logger.systemMessage(
                `Total ${history.length} messages with friend ${friendId} has successfully fetched.`
              );
              resolve(histories);
            });
          break;
        case Action.ReadMessage: this.readMessages(id as string, friendId as string, messageIds as string[]); break;
        case Action.SendMessage:
          resolve(this.addMessageRecord(id as string, friendId as string, message as string));
          break;
        case Action.CreateSocket:
          this.$logger.systemMessage(`chat ws has already created.`);
          this.ws = this.$message.onHistoryUpdated$(id as string).subscribe(
            history => {
              this.$logger.systemMessage(
                `Total ${history.length} messages with friend ${friendId} has successfully fetched.`
              );
              this.messageHistory.next(history
                .sort((a, b) => a.sendTime.toDate().toISOString() > b.sendTime.toDate().toISOString() ? 1 : -1)
              );
            }
          );
          break;
        case Action.CloseSocket:
          if (this.ws) {
            this.ws.unsubscribe();
            this.$logger.systemMessage(`chat ws has already destroyed.`);
          }
          resolve(true);
          break;
      }
    });
  }

  private readMessages(id: string, friendId: string, messageIds: string[]): void {
    this.$message.read(id, messageIds);
    this.$message.read(friendId, messageIds);
  }

  /**
   * @description 新建訊息紀錄時同步更新雙方資料
   */
  private addMessageRecord(id: string, friendId: string, message: string): Promise<boolean> {
    return new Promise<boolean>(resolve =>
      this.$message.send(id, message, friendId)
        .then(messageId => this.$message.sync(id, message, friendId, messageId)
          .then(() => resolve(true)))
    );
  }
}
