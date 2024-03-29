import { IUser } from '@utility/interface/user.interface';
import { Injectable } from '@angular/core';
import { LoggerService } from '@shared/services/logger.service';
import { EFriendsAction as Action, IFriendsEvent } from '@friend/shared/models/friend.model';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { UserCenterService } from '@shared/services/user-center.service';
import { User } from '@user/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FriendFeatureService extends FeatureService<IFriendsEvent, Action> {

  constructor(
    private $userCenter: UserCenterService,
    protected $logger: LoggerService
  ) {
    super($logger);
  }

  protected featureName = 'Friend';

  protected resolveAction({ action, id, user }: IFriendsEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchRecommendList:
          resolve(this.$userCenter.fetchAllUsers());
          break;
        case Action.FetchInviteList:
          resolve(this.$userCenter.fetchUsers((user as User).inviteAddFriends));
          break;
        case Action.SearchUser:
          resolve(this.$userCenter.fetchUser(id as string));
          break;
        case Action.AddFriend:
          user?.addFriend(id as string);
          this.$userCenter.updateUserProfile({ friends: user?.friends } as IUser, user?.id as string).then(() => {
            this.$logger.systemMessage(`user ${user?.id} has successfully added ${id}.`);
            resolve(this.updateFriendInvitedList((user as User).id, id as string));
          });
          break;
        case Action.IgnoreInvite:
          user?.ignoreInvite(id as string);
          this.$userCenter.updateUserProfile({ inviteAddFriends: user?.inviteAddFriends } as IUser, user?.id as string)
            .then(() => {
              this.$logger.systemMessage(`user ${user?.id} invitation has successfully ignored.`);
              resolve(this.removeFriend((user as User).id, id as string));
            });
          break;
      }
    });
  }

  /**
   * @description 將使用者從目標好友清單內移除
   */
  private removeFriend(userId: string, friendId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.$userCenter.fetchUser(friendId).then(
        ({ friends }) => this.$userCenter.updateUserProfile({
          friends: (friends as string[]).filter(id => id !== userId)
        } as IUser, friendId)
      ).then(() => resolve(true));
    });
  }

  /**
   * @description 更新目標好友邀請清單
   */
  private updateFriendInvitedList(userId: string, friendId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.$userCenter.fetchUser(friendId).then(
        ({ inviteAddFriends }) => this.$userCenter.updateUserProfile({
          inviteAddFriends: [...inviteAddFriends as string[], ...[userId]]
        } as IUser, friendId)
      ).then(() => resolve(true));
    });
  }
}
