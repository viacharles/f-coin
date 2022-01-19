import { Injectable } from '@angular/core';
import { LoggerService } from '@shared/services/logger.service';
import { FriendsAction as Action, IFriendsEvent } from '@user/shared/models/friend.model';
import { User } from '@user/shared/models/user.model';
import { UserService } from '@user/shared/services/user.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { IFriend, IUser } from '@utility/interface/user.interface';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendService extends FeatureService<IFriendsEvent, Action> {

  constructor(
    private $user: UserService,
    protected $logger: LoggerService
  ) {
    super($logger);
  }

  protected featureName = 'Friend';

  protected resolveAction({ action, id, user }: IFriendsEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchRecommendList:
          resolve(
            this.fetchRecommendList(id as string)
          );
          break;
        case Action.FetchInviteList:
          resolve(
            this.$user.getUser(user).then(u => this.fetchInviteList(u, id as string))
          );
          break;
        case Action.AddFriend:
          resolve(
            this.$user.getUser(user).then(u => this.addFriend(u, id as string))
          );
          break;
        case Action.IgnoreInvite:
          resolve(
            this.$user.getUser(user).then(u => this.ignoreInvite(u, id as string))
          );
          break;
      }
    });
  }

  /**
   *  @description 其實只是拿到DB裡全部陌生人的資料
   */
  private fetchRecommendList(uid: string): Promise<IUser[]> {
    return new Promise(
      (resolve) => { }
      // this.$friend.fetchRecommendList(uid)
      //   .then((users: { key: string, value: IUser }[]) =>
      //     resolve(users.map(user => user.value))
      // )
    );
  }

  /**
   * @description 拿到對user發出交友邀請的人的資料
   */
  private fetchInviteList(user: User, uid: string): Promise<IUser[]> {
    return new Promise((resolve) => {
      if ((user.inviteAddFriends as string[])?.length > 0) {
        // forkJoin(user.inviteAddFriends?.map(id => this.$friend.getFriend(id)))
        //   .subscribe((friends: any) => {
        //     resolve(friends as IUser[]);
        //   });
      }
      else {
        resolve([]);
      }
    });
  }

  private addFriend(user: User, friendId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      user.addFriends(friendId).then(hasUpdated => {
        // if (hasUpdated) {
        //   console.log('addFriend', user)
        //   this.$friend.addFriend(user).then(() => resolve(true));
        // } else {
        //   alert('已經在好友裡嚕');
        //   resolve(false);
        // }
      });
    });
  }

  private ignoreInvite(user: User, friendId: string): Promise<void> {
    return new Promise<void>((resolve) => {
      // user.ignoreInvite(friendId).then(() => this.$friend.updateInviteList(user).then(() => resolve()));
    });
  }
}
