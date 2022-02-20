import { Subscription } from 'rxjs';
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
  constructor($logger: LoggerService, private $message: MessageService) {
    super($logger);
  }

  private ws = new Subscription();

  protected featureName = 'Chat';
  protected resolveAction({ action, id, friendId, message }: IChatEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchChatHistory:
          this.$message
            .fetchMessageRecord(id as string, friendId as string)
            .then((history) => {
              this.$logger.systemMessage(
                `Total ${history.length} messages with friend ${friendId} has successfully fetched.`
              );
              resolve(history);
            });
          break;
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
              resolve(history
                .filter(({ userId }) => userId === friendId)
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



  /**
   * @description 新建訊息紀錄時同步更新雙方資料
   */
  private addMessageRecord(id: string, friendId: string, message: string): Promise<boolean> {
    return new Promise<boolean>(resolve => Promise.all([
      this.$message.send(id, message, friendId),
      this.$message.send(friendId, message, id)
    ]).then(() => resolve(true)));
  }
}
