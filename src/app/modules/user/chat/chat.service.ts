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

  protected featureName = 'Chat';
  protected resolveAction({action, id, friendId, message }: IChatEvent): Promise<any> {
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
          resolve(
            this.$message.send(
              id as string,
              message as string,
              friendId as string
            )
          );
          break;
      }
    });
  }
}
