import { IMessage } from './../../../../../utility/interface/messageCenter.interface';
import { finalize } from 'rxjs/operators';
import { IFriend, IUser } from '@utility/interface/user.interface';
import { Subscription, timer } from 'rxjs';
import { IEvent } from '@utility/interface/common.interface';
import { User } from '@user/shared/models/user.model';
import firebase from 'firebase';

/**
 * @description 好友資訊，隨機秒數更新登陸狀態
 */
export class Friend implements IFriend {
  constructor({ id, name, avatar}: IUser, messages?: IMessage[]) {
    this.id = id;
    this.name = name;
    this.avatar = avatar || '';
    this.startTimer();
  }

  public id: string;
  public name: string;
  public avatar: string;
  public isLogin = false;

  private timer$ = timer(Math.random() * 6000).pipe(
    finalize(() => this.startTimer())
  );
  private subscription = new Subscription();

  /**
   * @description 開始計時，結束前次訂閱，開始新一輪隨機秒數計時
   */
  private startTimer(): void {
    this.subscription?.unsubscribe();
    this.subscription = this.timer$.subscribe(
      () => {
        (this.isLogin = Math.random() >= 0.5);
      }
    );
  }

  /**
   * @description 依照好友id取得聊天室最後一則訊息
   */
  private getLastMessageByFriendId(id: string, messages: IMessage[]): string {
    const FilterMessages = messages.filter(({ sendTo, userId }) => userId === id );
    const FormatMessages = FilterMessages.map(message => {
      const Message = message;
      Message.message.replace(/<br>/g, '');
      return Message;
    });
    return FormatMessages.length === 0 ? '' : FormatMessages[FormatMessages.length - 1].message;
  }

  /**
   * @description 依照好友id取得聊天室最後一則訊息的送出時間
   */
  private getLastSendTimeByFriendId(id: string, messages: IMessage[]): firebase.firestore.Timestamp|null {
    const FilterMessages = messages.filter(({ sendTo, userId }) => userId === id);
    return FilterMessages.length === 0 ? null : FilterMessages[FilterMessages.length - 1].sendTime;
  }
}

export enum EFriendsAction {
  FetchRecommendList = 1,
  FetchInviteList,
  SearchUser,
  AddFriend,
  IgnoreInvite
}

export interface IFriendsEvent extends IEvent<EFriendsAction> {
  id?: string;
  user?: User;
}