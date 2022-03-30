import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '@friend/shared/models/friend.model';
import { User } from '@user/shared/models/user.model';
import { IUser } from '@utility/interface/user.interface';
import { take } from 'rxjs/operators';
import { UserCenterService } from '@shared/services/user-center.service';
import { LoggerService } from '@shared/services/logger.service';

/**
 * friend list
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private $userCenter: UserCenterService,
    private $logger: LoggerService
  ) {
  }


  private friends = new BehaviorSubject<Friend[]>([]);
  public friends$: Observable<Friend[]> = this.friends.asObservable();

  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  /**
   * @description 生成使用者資料
   */
  public generateUser(uid: string): void {
    this.$userCenter.fetchUser(uid).then(user => {
      this.user.next(new User(user));
      this.$logger.systemMessage(`welcome user ${uid}`);
    });
  }

  /**
   * @description 主動更新好友清單
   */
  public fetchFriendList(user: User): void {
    this.$userCenter.fetchUsers(user.friends).then(friends => this.updateFriendsList(friends));
  }

  public getUser(user?: User): Promise<User> {
    return new Promise<User>(resolve => {
      if (user) {
        resolve(user);
      } else {
        this.user$.pipe(take(1)).subscribe(_ => resolve(_ as User));
      }
    });
  }

  private updateFriendsList(friends: IUser[]): void {
    this.friends.next(friends.map((friend) => new Friend(friend)));
  }
}
