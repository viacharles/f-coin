import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from '@user/shared/models/friend.model';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Output() switchToFriend = new EventEmitter<void>();
  constructor(private $user: UserService, public router: Router) {}

  /**
   * @description 因sub menu不放在router outlet中，故無法透過activatedRoute獲得路由參數
   */
  get activatedFriendId(): string {
    const Array = this.router.url.split('/');
    return Array[Array.length - 1];
  }

  public friends$ = this.$user.friends$.pipe(
    tap((friends) => this.onFriendsUpdated(friends))
  );

  ngOnInit(): void {
    this.$user.fetchFriendList();
  }

  public toAddFriend(): void {
    this.switchToFriend.emit();
  }

  private onFriendsUpdated(friends: Friend[]): void {}
}
