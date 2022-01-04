import { take, map, takeUntil, filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction as Action } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage, IMessageBatched } from '@utility/interface/messageCenter.interface';
import { ActivatedRoute } from '@angular/router';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { Friend } from '@user/shared/models/friend.model';
import { combineLatest } from 'rxjs';
import { IUser } from '@utility/interface/user.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends UnSubOnDestroy implements OnInit {
  constructor(
    private $feature: ChatService,
    private $user: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public message = '';
  public history: IMessage[] = [];
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
          message: this.message,
          friendId: this.friend?.id,
        })
        .then(() => (this.message = ''));
    }
  }

  private initial(friendId: string, friends: Friend[]): void {
    this.friend = friends.find(({ id }) => id === friendId) as Friend;
    this.$feature
      .fireEvent<IMessage[]>({
        action: Action.FetchChatHistory,
        friendId,
        id: this.userId as string,
      })
      .then((history) => {
        console.log('history', history);
        (this.history = history)
      });
  }

}
