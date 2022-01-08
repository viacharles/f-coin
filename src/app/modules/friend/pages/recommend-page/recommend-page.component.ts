import { LoggerService } from '@shared/services/logger.service';
import { FriendService } from './../../shared/services/friend.service';
import { IFriend } from '@utility/interface/user.interface';
import { FirebaseService } from '@shared/services/firebase.service';
import { UserService } from '@user/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FriendsAction } from '@user/shared/models/friend.model';

@Component({
  selector: 'app-recommend-page',
  templateUrl: './recommend-page.component.html',
  styleUrls: ['./recommend-page.component.scss']
})
export class RecommendPageComponent implements OnInit {

  constructor(private $user: UserService, private $fb: FirebaseService, private $friend: FriendService, private $logger: LoggerService) { }

  ngOnInit(): void {
    this.init();
  }

  public inviteList: {key: IFriend}[] = [];



  private init(): void {
    this.$friend.fireEvent({
      action: FriendsAction.FetchInviteList,
      id: sessionStorage.getItem('id') as string
    }).then((friends: any) => {
      console.log('FriendsAction', friends)
      this.$logger.systemMessage(`${(<[]>friends).length} invitations were received `);
      this.inviteList = friends;
    })
  }

}
