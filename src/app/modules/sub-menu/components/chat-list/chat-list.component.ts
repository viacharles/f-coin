import { Component, OnInit } from '@angular/core';
import { Friend } from '@user/shared/models/friend.model';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  constructor(private $user: UserService) {}

  public friends$ = this.$user.friends$.pipe(
    tap((friends) => this.onFriendsUpdated(friends))
  );

  ngOnInit(): void {
    this.$user.fetchFriendList();
  }

  private onFriendsUpdated(friends: Friend[]): void {
    console.log(friends);
  }
}
