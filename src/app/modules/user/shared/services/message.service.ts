import { FirebaseService } from '@shared/services/firebase.service';
import { Injectable } from '@angular/core';

import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { LoggerService } from '@shared/services/logger.service';
import {
  IMessage,
  IMessageCenter,
} from '@utility/interface/messageCenter.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends DatabaseService {
  constructor($fb: FirebaseService, $logger: LoggerService) {
    super($fb, $logger);
  }

  protected databaseName = 'messageCenter';

  /**
   * @description 獲得好友對話紀錄
   */
  public fetchMessageRecord(id: string, friendId: string): Promise<IMessage[]> {
    return new Promise<IMessage[]>((resolve) => {
      this.$fb
        .getDoc('messageCenter', id)
        .collection('history')
        .get()
        .subscribe((res) =>
          resolve(
            (res.docs.map((doc) => doc.data()) as IMessage[]).filter(
              ({ userId }) => userId === friendId
            )
          )
        );
    });
  }
}
