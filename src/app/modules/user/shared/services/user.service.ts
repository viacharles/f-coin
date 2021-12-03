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
export class UserService {
  constructor(
    private $firebase: FirebaseService,
    private $logger: LoggerService
  ) {}

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

  public getChatHistory(id?: string): Promise<any> {
    return this.$firebase.request('user').read(id);
  }

  /**
   * @description 主動更新好友清單
   */
  public fetchFriendList(): void {
    this.$firebase
      .request('user')
      .read(sessionStorage.getItem('id') as string)
      .then(({ friends }: { friends: any[] }) => {
        //   friends.forEach((id: any) => {
        //     this.$firebase.request('user').update({ isLogin: false }, id);
        //   });
        forkJoin(
          friends.map((id) => this.$firebase.request('user').read$(id))
        ).subscribe((profiles: any) => this.updateFriendsList(profiles));
      });
  }

  private updateFriendsList(friends: any[]): void {
    console.log(`total ${friends.length} friends have updated.`);
    this.friends.next(friends.map((friend) => new Friend(friend)));
  }
}
