import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';
import { User } from '@user/shared/models/user.model';
import { IUser } from '@utility/interface/user.interface';
import { take } from 'rxjs/operators';

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

  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  /**
   * @description 生成使用者資料
   */
  public generateUser(uid: string): void {
    this.fetch()
      .read(uid)
      .then((profile: IUser) => {
        this.user.next(new User(profile));
        this.$logger.systemMessage(`welcome user ${uid}`);
      });
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
      .then(({ friends }: { friends: string[] }) => {
        //   friends.forEach((id: any) => {
        //     this.$firebase.request('user').update({ isLogin: false }, id);
        //   });
        if (friends) {
          forkJoin(friends?.map((id) => this.fetch().read$(id))).subscribe(
            (profiles: any) => {
              this.updateFriendsList(profiles as IUser[])}
          );
        }
      });
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
