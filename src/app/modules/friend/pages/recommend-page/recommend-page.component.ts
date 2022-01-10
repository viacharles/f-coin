import { take } from 'rxjs/operators';
import { LoggerService } from '@shared/services/logger.service';
import { IUser } from '@utility/interface/user.interface';
import { Component, OnInit } from '@angular/core';
import { FriendsAction as Action } from '@user/shared/models/friend.model';
import { environment } from 'src/environments/environment';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';
import { FriendService } from '../../shared/services/friend.service';

@Component({
  selector: 'app-recommend-page',
  templateUrl: './recommend-page.component.html',
  styleUrls: ['./recommend-page.component.scss']
})
export class RecommendPageComponent implements OnInit {

  constructor(
    private $feature: FriendService,
    private $user: UserService,
    private $logger: LoggerService) { }

  public inviteList: IUser[] = [];
  public recommendList: IUser[] = [];
  public defaultAvatar = environment.defaultAvatar;
  private user: User | null = null;

  get id(): string {
    return (this.user as User).id;
  }

  ngOnInit(): void {
    this.$user.user$.pipe(
      take(1)
    ).subscribe(
      user => {
        this.user = user;
        this.init();
      }
    );
    this.init();
  }

  public addFriend(friendId: string): void {
    this.$feature.fireEvent({
      action: Action.AddFriend,
      id: this.id,
      friendId
    });
  }

  private init(): void {
    this.$feature.fireEvent<IUser[]>({
      action: Action.FetchInviteList,
      id: this.id
    }).then((friends: IUser[]) => {
      this.$logger.systemMessage(`${(friends as []).length} invitations were received `);
      this.inviteList = friends;
    });
    this.$feature.fireEvent<IUser[]>({
      action: Action.FetchRecommendList,
      id: this.id
    }).then((friends: IUser[]) => {
      this.$logger.systemMessage(`${(friends as []).length} recommendations were received `);
      this.recommendList = friends;
    }
    );
  }

}
