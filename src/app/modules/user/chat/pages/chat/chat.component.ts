import { environment } from './../../../../../../environments/environment.prod';
import { take, map, takeUntil, filter, tap } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  @ViewChild('tMessages') tMessages?: ElementRef;
  constructor(
    private $feature: ChatService,
    private $user: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public message = '';
  public friend: Friend | null = null;
  public userId: string | null = null;
  public messageHistory: IMessage[] = [];
  public defaultAvatar = environment.defaultAvatar;
  public scrollTop = 0;

  ngOnInit(): void {
    this.$user.user$
      .pipe(take(1))
      .subscribe((user) => (this.userId = (user as IUser).id));
    combineLatest([
      this.$user.friends$.pipe(filter((friends) => friends.length > 0)),
      this.activatedRoute.params.pipe(filter(({ id }) => !!id)),
    ]).pipe(
      takeUntil(this.onDestroy$),
      map(([friends, { id }]) => ({ friends, id }))
    ).subscribe(({ id, friends }) => this.initial(id, friends));

    this.$feature.messageHistory$.pipe(takeUntil(this.onDestroy$))
      .subscribe(histories => this.afterMessageHistoriesUpdated(histories));
  }

  /**
   * @description rules for show friend's avatar.
   */
  public showAvatar(history: IMessage[], index: number, record: IMessage): boolean {
    if (index === 0) { return record.sendTo === this.userId ? true : false; }
    else {
      const thisTime = history[index].sendTime.toDate().toISOString().split(':')[1];
      const lastTime = history[index - 1].sendTime.toDate().toISOString().split(':')[1];
      return thisTime !== lastTime && record.sendTo === this.userId;
    }
  }

  public showDateDivider(history: IMessage[], index: number, record: IMessage): boolean {
    return index === 0 ? true
      : record.sendTime.toDate().toLocaleDateString() !== history[index - 1].sendTime.toDate().toLocaleDateString()
        ? true : false;
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
        .then(() => this.message = '');
    }
  }

  private afterMessageHistoriesUpdated(histories: IMessage[]): void {
    this.messageHistory = histories;
    switch (histories[histories.length - 1]?.sendTo) {
      case this.userId:
        this.markMessageAsRead(histories.filter(({ sendTo }) => sendTo === this.userId).map(({ id }) => id));
        break;
      case this.friend?.id:
        setTimeout(() => this.scrollToLastMessage.bind(this), 0);
        break;
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

  private markMessageAsRead(messageIds: string[]): void {
    this.$feature.fireEvent({
      action: Action.ReadMessage,
      id: this.userId as string,
      friendId: this.friend?.id,
      messageIds
    });
  }

  private scrollToLastMessage(): void {
    this.scrollTop = (this.tMessages?.nativeElement as HTMLElement).clientHeight;
  }

}
