import { finalize } from 'rxjs/operators';
import { IFriend, IUser } from '@utility/interface/user.interface';
import { Subscription, timer } from 'rxjs';
import { IMessage } from '@utility/interface/messageCenter.interface';

/**
 * @description 好友資訊，隨機秒數更新登陸狀態
 */
export class Friend implements IFriend {
  constructor({ id, name, avatar }: IUser) {
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
        (this.isLogin = Math.random() >= 0.5)}
    );
  }
}