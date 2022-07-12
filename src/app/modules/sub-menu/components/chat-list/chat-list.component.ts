import firebase from 'firebase/app';
import { IMessage } from '@utility/interface/messageCenter.interface';
import {
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from '@friend/shared/models/friend.model';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from '@user/shared/models/user.model';
import { BaseSubMenu } from '@utility/base/base-sub-menu';
import { EModule } from '@utility/enum/route.enum';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent extends BaseSubMenu {

  @Input() messages: IMessage[] = [];

  constructor(
    private $user: UserService,
    public router: Router
  ) {
    super();
  }

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

  protected onChanges({ user }: SimpleChanges): void {
    if (user?.currentValue.id === sessionStorage.getItem('id')) {
      this.$user.fetchFriendList(user.currentValue as User);
    }
  }

  public toAddFriend(): void {
    this.updateModule.emit(EModule.Friend);
  }

  /**
   * @description 依照好友id取得聊天室未讀訊息數量
   */
  public getUnreadNumberByFriendId(id: string): number {
    return this.messages.filter(({ sendTo, userId, isRead }) => userId === id && sendTo === this.user.id && !isRead).length;
  }

  /**
   * @description 依照好友id取得聊天室最後一則訊息
   */
  public getLastMessageByFriendId(id: string): string {
    const FriendMessages = this.messages.filter(({ userId }) => userId === id );
    const LastMessage = FriendMessages.length === 0 ? '' : FriendMessages[FriendMessages.length - 1].message;
    const FormatMessage = LastMessage.replace(/<br>/g, '');
    // console.log('aa-', FormatMessages)
    return FormatMessage;
  }

  /**
   * @description 依照好友id取得聊天室最後一則訊息的送出時間
   */
  public getLastSendTimeByFriendId(id: string): firebase.firestore.Timestamp|null {
    const FilterMessages = this.messages.filter(({ sendTo, userId }) => userId === id);
    return FilterMessages.length === 0 ? null : FilterMessages[FilterMessages.length - 1].sendTime;
  }

  private onFriendsUpdated(friends: Friend[]): void {}
}
