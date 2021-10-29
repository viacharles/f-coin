import { Component } from '@angular/core';
import { Friend } from '@user/shared/models/friend.model';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent {
  constructor(private $user: UserService) {}
  public friends$ = this.$user.friends$.pipe(
    tap((friends) => this.onFriendsUpdated(friends))
  );

  private onFriendsUpdated(friends: Friend[]): void {
    console.log(friends);
  }
}
