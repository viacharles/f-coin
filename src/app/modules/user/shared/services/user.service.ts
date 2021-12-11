import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';

/**
 * friend list
 */
@Injectable({
  providedIn: 'root',
})
export class UserService extends DatabaseService {
  constructor($fb: FirebaseService, $logger: LoggerService) {
    super($fb, $logger);
  }

  protected databaseName = 'user';

  private friends = new BehaviorSubject<Friend[]>([]);
  public friends$: Observable<Friend[]> = this.friends.asObservable();

  private user = new BehaviorSubject(null);
  public user$ = this.user.asObservable();

  /**
   * @description 生成使用者資料
   */
  public generateUser(user: any): void {
    this.user.next(user);
    this.$logger.systemMessage(`welcome user ${user.uid}`);
  }

  /**
   * @description 獲取聊天紀錄
   */
  public getChatHistory(id?: string): Promise<any> {
    return this.fetch().read(id);
  }

  /**
   * @description 主動更新好友清單
   */
  public fetchFriendList(): void {
    this.fetch()
      // .read()
      // .then((datas: any) => datas.forEach(({key, value}: any) => {
      //   this.$firebase.request('user').update({id : key}, key);
      // })
      // )
      .read(sessionStorage.getItem('id') as string)
      .then(({ friends }: { friends: any[] }) => {
        //   friends.forEach((id: any) => {
        //     this.$firebase.request('user').update({ isLogin: false }, id);
        //   });
        forkJoin(friends.map((id) => this.fetch().read$(id))).subscribe(
          (profiles: any) => this.updateFriendsList(profiles)
        );
      });
  }

  private updateFriendsList(friends: any[]): void {
    this.$logger.systemMessage(`total ${friends.length} friends have updated.`);
    this.friends.next(friends.map((friend) => new Friend(friend)));
  }
}
