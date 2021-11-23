import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '@shared/services/firebase.service';
import { Friend } from '@user/shared/models/friend.model';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnInit{
  constructor(private $user: UserService, private $firebase: FirebaseService) {}

  ngOnInit(): void{
  }
  public friends$ = this.$user.friends$.pipe(
    tap((friends) => this.onFriendsUpdated(friends))
  );

  private onFriendsUpdated(friends: Friend[]): void {
    console.log(friends);
  }

  private userActivityMock(): void{
    // setInterval((_=> ))
  }

  private getRandomUsers() {
    // const users;
    // this.$firebase.request('user').read()
  }

}
