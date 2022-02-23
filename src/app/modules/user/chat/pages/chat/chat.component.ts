import { take, map, takeUntil, filter, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction as Action } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { ActivatedRoute } from '@angular/router';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { Friend } from '@friend/shared/models/friend.model';
import { combineLatest } from 'rxjs';
import { IUser } from '@utility/interface/user.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends UnSubOnDestroy implements OnInit {
  constructor(
    public $feature: ChatService,
    private $user: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public message = '';
  public friend: Friend | null = null;
  public userId: string | null = null;

  ngOnInit(): void {
    this.$user.user$
      .pipe(take(1))
      .subscribe((user) => (this.userId = (user as IUser).id));
    combineLatest([
      this.$user.friends$.pipe(filter((friends) => friends.length > 0)),
      this.activatedRoute.params.pipe(filter(({ id }) => !!id)),
    ])
      .pipe(
        takeUntil(this.onDestroy$),
        map(([friends, { id }]) => ({ friends, id }))
      )
      .subscribe(({ id, friends }) => this.initial(id, friends));
  }

  public afterKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.message.trim() !== '') {
      this.$feature
        .fireEvent({
          action: Action.SendMessage,
          id: this.userId as string,
          friendId: this.friend?.id,
          message: this.message
        })
        .then(() => (this.message = ''));
    }
  }

  private initial(friendId: string, friends: Friend[]): void {
    this.friend = friends.find(({ id }) => id === friendId) as Friend;
    this.$feature.fireEvent({ action: Action.CloseSocket }).then(() => {
      this.$feature.fireEvent<IMessage[]>({
        action: Action.CreateSocket,
        id: this.userId as string,
        friendId
      });
    });
  }

}
