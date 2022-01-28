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
          this.$userCenter.updateUserProfile({
            friends: user?.friends,
            inviteAddFriends: user?.inviteAddFriends
          } as User, user?.id as string).then(() => {
            this.$logger.systemMessage(`user ${user?.id} has successfully added ${id}.`);
            resolve(true);
          });
          break;
        case Action.IgnoreInvite:
          user?.ignoreInvite(id as string);
          this.$userCenter.updateUserProfile({ inviteAddFriends: user?.inviteAddFriends } as User, user?.id as string)
            .then(() => {
              this.$logger.systemMessage(`user ${user?.id} invitation has successfully ignored.`);
              resolve(true);
            });
          break;
      }
    });
  }
}
