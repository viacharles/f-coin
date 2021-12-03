import { ChatAction, IChatEvent } from '@user/shared/models/chat.model';
import { Injectable } from '@angular/core';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { LoggerService } from '@shared/services/logger.service';
import { UserService } from '@user/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends FeatureService<IChatEvent, ChatAction> {
  constructor($logger: LoggerService, private $user: UserService) {
    super($logger);
  }

  protected featureName = 'Chat';
  protected resolveAction({ action, id }: IChatEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case ChatAction.FetchChatHistory:
          resolve(this.$user.getChatHistory(id));
          break;
      }
    });
  }
}
