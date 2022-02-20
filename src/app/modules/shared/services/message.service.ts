import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseService } from '@shared/services/firebase.service';
import { Injectable } from '@angular/core';

import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { LoggerService } from '@shared/services/logger.service';
import {
  IMessage,
  IMessageCenter,
} from '@utility/interface/messageCenter.interface';
import firebase from 'firebase/app';
import { OverlayService } from '@shared/overlay/overlay.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends DatabaseService {
  constructor(
    $fb: FirebaseService,
    $logger: LoggerService,
    private $overlay: OverlayService
  ) {
    super($fb, $logger);
  }

  protected databaseName = 'messageCenter';

  public onHistoryUpdated$(userId: string): Observable<IMessage[]> {
    return this.$fb
      .getCollection(this.databaseName)
      .doc(userId)
      .collection('history')
      .valueChanges()
      .pipe(
        map(res => res as IMessage[])
      );
  }

  /**
   * @description 獲得好友對話紀錄
   */
  public fetchMessageRecord(id: string, friendId: string): Promise<IMessage[]> {
    const LoadingId = this.$overlay.startLoading();
    const ActivatedElement: HTMLElement = document.activeElement as HTMLElement;
    ActivatedElement.blur();
    return new Promise<IMessage[]>((resolve) => {
      this.$fb
        .getDoc('messageCenter', id)
        .collection('history')
        .get()
        .subscribe((res) => {
          this.$overlay.endLoading(LoadingId, ActivatedElement);
          resolve(
            (res.docs.map((doc) => doc.data()) as IMessage[]).filter(
              ({ userId }) => userId === friendId
            )
          );
        });
    });
  }

  /**
   * @description 發送訊息
   * @param id 使用者ID
   * @param userId 訊息對象ID
   */
  public send(id: string, message: string, userId: string): Promise<boolean> {
    const LoadingId = this.$overlay.startLoading();
    const ActivatedElement: HTMLElement = document.activeElement as HTMLElement;
    ActivatedElement.blur();
    return new Promise<boolean>((resolve) => {
      this.$fb
        .getDoc('messageCenter', id)
        .collection('history')
        .add({
          message,
          isRead: false,
          userId,
          sendTime: firebase.firestore.Timestamp.now(),
        } as IMessage)
        .then((res) => {
          this.$logger.systemMessage(
            `message ${res.id} has successfully created.`
          );
          this.$fb
            .getDoc('messageCenter', id)
            .collection('history')
            .doc(res.id)
            .update({ id: res.id })
            .then(() => {
              this.$overlay.endLoading(LoadingId, ActivatedElement);
              resolve(true);
            });
        });
    });
  }
}
