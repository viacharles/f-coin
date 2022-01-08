import { filter } from 'rxjs/operators';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { UserService } from '@user/shared/services/user.service';
import { Injectable } from '@angular/core';
import { FriendsAction as Action, FriendsAction, IFriendsEvent } from '@user/shared/models/friend.model';
import { IFriend, IUser } from '@utility/interface/user.interface';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService extends FeatureService<IFriendsEvent, FriendsAction> {

  constructor(private $fb: FirebaseService, protected $logger: LoggerService) { super( $logger)}

  protected featureName = 'Friend';

  protected resolveAction({action, id}: IFriendsEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchRecommendList:
              resolve(this.fetchRecommendList(id as string));
              break;
        case Action.FetchInviteList:
              resolve(this.fetchInviteList(id as string));
              break;
      }
    });
    }

  /**
   *  @description 其實只是拿到DB裡全部陌生人的資料
   * */ 
  private fetchRecommendList(uid: string): Promise<{key: string, value: IFriend}[]> {
    return new Promise((resolve)=>
      this.$fb.request('user').read()
      .then((resFriends: {key: string, value: IFriend}[]) => {
        resFriends.filter(resFriend => resFriend.key !== uid )
        })
      .then((resFriends: {key: string, value: IFriend}[]) => resolve(resFriends)));
  }

  /**
   * @description 拿到對user發出交友邀請的人的資料
   */
  private fetchInviteList(uid: string): Promise<IFriend[]> {
    return new Promise((resolve) =>
      this.$fb.request('user').read(uid)
      .then((user: IUser) => {
        if ((<string[]>user.inviteAddFriend)?.length > 0) {
          forkJoin(user.inviteAddFriend?.map(id =>
            this.$fb.request('user').read$(id)
          .subscribe((friends: {key: string, value: IFriend}[]) => {
            console.log('fetchInviteList', )
            resolve(friends.map(friend => friend.value))
            }
            ))
          )
        }}
        )
    )
  }
}
