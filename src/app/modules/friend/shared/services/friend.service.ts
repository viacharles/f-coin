import { take } from 'rxjs/operators';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';
import { Injectable } from '@angular/core';
import { IUser } from '@utility/interface/user.interface';
import { forkJoin } from 'rxjs';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';
import { DatabaseService } from '@utility/abstract/database-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class FriendService extends DatabaseService {

  constructor(
    protected $fb: FirebaseService,
    private $user: UserService,
    protected $logger: LoggerService
  ) {
    super($fb, $logger);
  }

  protected databaseName = 'user';

  /**
   *  @description 其實只是拿到DB裡全部陌生人的資料
   */
  public fetchRecommendList(uid: string): Promise<{ key: string, value: IUser }[]> {
    return new Promise((resolve) =>
      this.fetch().read().then((users: { key: string, value: IUser }[]) => {
         resolve(users.filter(user => user.key !== uid));
      })
    );
  }

  public getFriend(id: string): Promise<IUser> {
    return this.fetch().read(id);
  }

  public addFriend(user: User): Promise<void> {
    return this.fetch()
            .update({
              friends: user.friends,
              inviteAddFriends: user.inviteAddFriends
            } as IUser, user.id);
  }

  public updateInviteList(user: User): Promise<void> {
    return new Promise<void>((resolve) =>
      this.fetch().update({inviteAddFriends: user.inviteAddFriends}, user.id)
      .then(() => resolve())
    )
  }
}
