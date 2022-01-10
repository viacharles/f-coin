import { filter, map, take } from 'rxjs/operators';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { FriendsAction as Action, FriendsAction, IFriendsEvent } from '@user/shared/models/friend.model';
import { IFriend, IUser } from '@utility/interface/user.interface';
import { forkJoin } from 'rxjs';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService extends FeatureService<IFriendsEvent, FriendsAction> {

  constructor(
    private $fb: FirebaseService,
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
          resolve(this.fetchRecommendList(id as string));
          break;
        case Action.FetchInviteList:
          resolve(this.fetchInviteList(id as string));
          break;
        case Action.AddFriend:
          resolve(
            this.getUser(user).then(u => this.addFriend(u, id as string))
          );
          break;
      }
    });
  }

  /**
   *  @description 其實只是拿到DB裡全部陌生人的資料
   */
  private fetchRecommendList(uid: string): Promise<IFriend[]> {
    return new Promise((resolve) =>
      this.$fb.request('user').read().then((friends: { key: string, value: IFriend }[]) => {
        return friends.filter(friend => friend.key !== uid);
      })
        .then((friends: { key: string, value: IFriend }[]) =>
          resolve(friends.map(friend => friend.value))
        )
    );
  }

  /**
   * @description 拿到對user發出交友邀請的人的資料
   */
  private fetchInviteList(uid: string): Promise<IUser[]> {
    return new Promise((resolve) =>
      this.$fb.request('user').read(uid)
        .then((user: IUser) => {
          if ((user.inviteAddFriends as string[])?.length > 0) {
            forkJoin(user.inviteAddFriends?.map(id => this.$fb.request('user').read$(id)))
              .subscribe((friends: any) => {
                resolve(friends as IUser[]);
              });
          }
          else {
            resolve([]);
          }
        })
    );
  }

  private addFriend(user: User, friendId: string): Promise<void> {
    return new Promise<void>((resolve) => {
      user.addFriends(friendId).then(hasUpdated => {
        if (hasUpdated) {
          this.$fb
            .request('user')
            .update({
              friends: user.friends,
              inviteAddFriends: user.inviteAddFriends
            } as IUser, user.id)
            .then(() => resolve());
        } else {
          alert('已經在好友裡嚕');
          resolve();
        }
      });
    });
  }

  private getUser(user?: User): Promise<User> {
    return new Promise<User>(resolve => {
      if (user) {
        resolve(user);
      } else {
        this.$user.user$.pipe(take(1)).subscribe(_ => resolve(_ as User));
      }
    });
  }
}
