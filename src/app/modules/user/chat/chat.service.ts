import { ChatAction, IChatEvent } from '@user/shared/models/chat.model';
import { Injectable } from '@angular/core';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { LoggerService } from '@shared/services/logger.service';
import { UserService } from '@user/shared/services/user.service';
import { MessageService } from '@user/shared/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends FeatureService<IChatEvent, ChatAction> {
  constructor($logger: LoggerService, private $message: MessageService) {
    super($logger);
  }

  protected featureName = 'Chat';
  protected resolveAction({ action, id, friendId }: IChatEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case ChatAction.FetchChatHistory:
          resolve(
            this.$message.fetchMessageRecord(id as string, friendId as string)
          );
          break;
      }
    });
  }
}
