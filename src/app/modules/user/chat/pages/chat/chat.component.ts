import { environment } from './../../../../../../environments/environment.prod';
import { take, map, takeUntil, filter, tap } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction as Action } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { ActivatedRoute } from '@angular/router';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { Friend } from '@friend/shared/models/friend.model';
import { combineLatest } from 'rxjs';
import { IUser } from '@utility/interface/user.interface';
import { WindowHelper } from '@utility/helper/window-helper';
import { ResizeObserver } from 'resize-observer';
import { ResizeObserverEntry } from 'resize-observer/lib/ResizeObserverEntry';

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
  public friend?: Friend;
  public userId?: string;
  public messageHistory: IMessage[] = [];
  public defaultAvatar = environment.defaultAvatar;
  public scrollTop = 0;
  /**
   * @description 控制聊天室滾動條是否滾至最新訊息
   */
  private shouldScroll = false;
  /**
   * @description 聊天室窗滾動條觀察者
   */
  private observer?: ResizeObserver;

  ngOnInit(): void {
    this.$user.user$
      .pipe(take(1))
      .subscribe((user) => (this.userId = (user as IUser).id));
    combineLatest([
      this.$user.friends$.pipe(
        filter((friends) => friends.length > 0),
      ),
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
    if (!this.observer) {
      this.settingObserver();
    }
    this.messageHistory = histories;
    switch (histories[histories.length - 1]?.sendTo) {
      case this.userId:
        this.markMessageAsRead(histories.filter(({ sendTo }) => sendTo === this.userId).map(({ id }) => id));
        break;
      case this.friend?.id:
        this.shouldScroll = true;
        break;
    }
  }

  private initial(friendId: string, friends: Friend[]): void {
    this.scrollTop = 0;
    this.shouldScroll = true;
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

  private settingObserver() {
    this.observer = WindowHelper.generateResizeObserver((entry: ResizeObserverEntry) => {
      if (this.shouldScroll) {
        this.scrollTop = entry.contentRect.height;
        this.shouldScroll = false;
      }
    });
    this.observer.observe(this.tMessages?.nativeElement);
  }

  protected onDestroy() {
    this.observer?.disconnect();
  }

}
