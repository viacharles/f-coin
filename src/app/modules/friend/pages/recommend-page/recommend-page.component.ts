import { take } from 'rxjs/operators';
import { LoggerService } from '@shared/services/logger.service';
import { IUser } from '@utility/interface/user.interface';
import { Component, OnInit } from '@angular/core';
import { EFriendsAction as Action } from '@friend/shared/models/friend.model';
import { environment } from 'src/environments/environment';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';
import { FriendFeatureService } from '@friend/shared/services/friend-feature.service';

@Component({
  selector: 'app-recommend-page',
  templateUrl: './recommend-page.component.html',
  styleUrls: ['./recommend-page.component.scss']
})
export class RecommendPageComponent implements OnInit {

  constructor(
    private $feature: FriendFeatureService,
    private $user: UserService,
    private $logger: LoggerService) { }

  public defaultAvatar = environment.defaultAvatar;
  private user?: User;
  public inviteList: IUser[] = [];
  public recommendList: IUser[] = [];

  get id(): string {
    return (this.user as User).id;
  }

  ngOnInit(): void {
    this.$user.user$.pipe(
      take(1)
    ).subscribe(
      user => {
        this.user = user as User;
        this.init();
      }
    );
  }

  public addFriend(friendId: string): void {
    this.$feature.fireEvent({
      action: Action.AddFriend,
      id: friendId,
      user: this.user as User
    }).then(() => this.inviteList = this.inviteList.filter(user => user.id !== friendId));
  }

  public ignoreInvite(friendId: string): void {
    this.$feature.fireEvent({
      action: Action.IgnoreInvite,
      user: this.user as User,
      id: friendId
    }).then(() => this.inviteList = this.inviteList.filter(user => user.id !== friendId));
  }

  private init(): void {
    this.$feature.fireEvent<IUser[]>({
      action: Action.FetchInviteList,
      user: this.user
    }).then((users: IUser[]) => {
      this.$logger.systemMessage(`${(users as []).length} invitations were received `);
      this.inviteList = users;
    });

    this.$feature.fireEvent<IUser[]>({
      action: Action.FetchRecommendList,
    }).then((users: IUser[]) => {
      this.$logger.systemMessage(`${(users as []).length} recommendations were received `);
      this.recommendList = users.filter(({ id }) => !this.user?.friends.includes(id) && id !== this.user?.id);
    });
  }

}
