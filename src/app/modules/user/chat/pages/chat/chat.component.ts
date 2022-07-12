import { ESize } from '@utility/enum/common.enum';
import { UploadDialogComponent } from './../../../../shared/overlay/upload-dialog/upload-dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { EFileType } from '@utility/enum/file.enum';
import { environment } from 'src/environments/environment.prod';
import { take, map, takeUntil, filter, tap } from 'rxjs/operators';
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction as Action } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { ActivatedRoute } from '@angular/router';
import { Friend } from '@friend/shared/models/friend.model';
import { combineLatest } from 'rxjs';
import { IUser } from '@utility/interface/user.interface';
import { WindowHelper } from '@utility/helper/window-helper';
import { ResizeObserver } from 'resize-observer';
import { ResizeObserverEntry } from 'resize-observer/lib/ResizeObserverEntry';
import { BaseComponent } from '@utility/base/base-component';
import { WindowService } from '@shared/services/window.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { IUploadDialog } from '@utility/interface/common.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends BaseComponent {
  @ViewChild('tMessages') tMessages?: ElementRef;
  @ViewChildren('tDateDividers') tDateDividers?: QueryList<ElementRef>;
  @ViewChild('tDateBuoy') tDateBuoy?: ElementRef;
  @ViewChild('tSearch') tSearch?: ElementRef;

  constructor(
    private $feature: ChatService, public $user: UserService, private $window: WindowService, private activatedRoute: ActivatedRoute,
    private $overlay: OverlayService
  ) {
    super();
  }
  get dateBuoyLeft(): string { return `calc(60px + ${this.$window.submenuWidth}px + ${this.$window.pageWidth / 2}px)`; }
  public friend?: Friend;
  public userId?: string;
  public messageHistory: IMessage[] = [];
  public defaultAvatar = environment.defaultAvatar;
  public scrollTop = 0;
  public fileType = EFileType;
  /**
   * @description DateBuoy裡顯示的文字
   */
  public dateBuoyValue = '';
  /**
   * @description 是否顯示DateBuoy
   */
  public showDateBuoy = false;
  /**
   * @description 表示scroll是否處於停止狀態
   */
  public isScrollStop?: boolean;
  /**
   * @description 控制聊天室滾動條是否滾至最新訊息
   */
  public shouldScroll = false;
  /**
   * @description 聊天室窗滾動條觀察者
   */
  private observer?: ResizeObserver;
  /**
   * @description 判斷聊天室是否已滾至最底
   */
  public isScrollToBottom = true;

  onInit(): void {
    this.$user.user$
      .pipe(take(1))
      .subscribe((user) => this.userId = (user as IUser).id);
    combineLatest([
      this.$user.friends$.pipe(filter((friends) => friends.length > 0)),
      this.activatedRoute.params.pipe(
        filter(({ id }) => !!id),
        tap(() => this.afterChatIdChanged())
      ),
      this.$feature.messageHistory$
    ]).pipe(
      takeUntil(this.onDestroy$),
      map(([friends, { id }, messages]) => ({ friends, id, messages }))
    ).subscribe(
      ({ id, friends, messages }) => this.initial(id, friends, messages.filter(({ userId }) => userId === id))
    );
  }

  /**
   * @description drop and upload files
   */
  @HostListener('drop', ['$event']) ondrop(event: DragEvent): void {
    // event.preventDefault();
    event.stopPropagation();
    console.log('drop', event);
    const Files = event.dataTransfer?.files;
    if (Files) {
      this.toggleUploadDialog(Files).then(files => this.$feature.fireEvent);
    }
  }

  public hideTime(history: IMessage[], index: number, record: IMessage): boolean {
    return !this.isDiffMin(history, index, false) && !this.isDiffUser(history, index, record, false);
  }

  /**
   * @description rules for show friend's avatar.
   */
  public showAvatar(history: IMessage[], index: number, record: IMessage): boolean {
    if (index === 0) { return record.sendTo === this.userId ? true : false; }
    else {
      const thisMin = history[index].sendTime.toDate().toISOString().split(':')[1];
      const lastMin = history[index - 1].sendTime.toDate().toISOString().split(':')[1];
      return thisMin !== lastMin && record.sendTo === this.userId;
    }
  }

  public showDateDivider(history: IMessage[], index: number, record: IMessage): boolean {
    return index === 0 ? true
      : record.sendTime.toDate().toLocaleDateString() !== history[index - 1].sendTime.toDate().toLocaleDateString()
        ? true : false;
  }

  /**
   * @description if the single message is non-primary in its message group.
   */
  public isAppendage(history: IMessage[], index: number, record: IMessage): boolean {
    return !(this.isDiffMin(history, index, true) || this.isDiffUser(history, index, record, true));
  }

  /**
   * @description
   */
  public afterKeyup(event: KeyboardEvent, element: HTMLDivElement): void {
    if (event.key === 'Enter' && !event.shiftKey && element.innerHTML.trim() !== '' && !event.isComposing) {
      element.innerHTML = element.innerHTML.replace(/<div><br><\/div>$/, '');
      Promise.all([
        (element.innerHTML.match(/<img.*?(?:>|\/>)/gi) as string[])?.map(message =>
          this.$feature
          .fireEvent({
            action: Action.SendMessage,
            id: this.userId as string,
            friendId: this.friend?.id,
            message
          })),
        this.$feature
          .fireEvent({
            action: Action.SendMessage,
            id: this.userId as string,
            friendId: this.friend?.id,
            message: element.innerHTML.replace(/<img.*?(?:>|\/>)/gi, '')
          })
      ]).then(() => element.innerHTML = '');
    }
  }

  /**
   * @description 顯示聊天內容部分的scroll進行時
   */
  public onScroll({ scrollTop, scrollHeight, clientHeight }: HTMLElement): void {
    this.isScrollStop = false;
    // == 計算 目前 dateBuoy顯示的內容
    const dateBuoyY = this.tDateBuoy?.nativeElement.getBoundingClientRect().y;
    const anchors = this.tDateDividers
      ?.map(elem => elem.nativeElement.getBoundingClientRect().y)
      .filter(num => num <= dateBuoyY) as number[];
    this.dateBuoyValue = (this.tDateDividers?.toArray()[anchors.length === 0 ? 0 : anchors.length - 1] as ElementRef)
      .nativeElement.innerText as string;
    this.isScrollToBottom = scrollTop + clientHeight >= scrollHeight;
  }

  /**
   * @description 顯示聊天內容部分的scroll停止時
   */
  public onScrollEnd(): void {
    this.isScrollStop = true;
  }

  public scrollToBottom(container: HTMLElement, { clientHeight }: HTMLUListElement): void {
    container.scrollTop = clientHeight;
  }

  private afterChatIdChanged(): void {
    this.shouldScroll = true;
    if ((this.tSearch?.nativeElement as HTMLInputElement)?.checked) {
      (this.tSearch?.nativeElement as HTMLInputElement).checked = false;
    }
  }

  private updateMessages(histories: IMessage[]): void {
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

  private initial(friendId: string, friends: Friend[], histories: IMessage[]): void {
    this.friend = friends.find(({ id }) => id === friendId) as Friend;
    this.updateMessages(histories);
    if (!this.observer) {
      setTimeout(() => this.settingObserver(), 0);
    }
  }

  private markMessageAsRead(messageIds: string[]): void {
    this.$feature.fireEvent({
      action: Action.ReadMessage,
      id: this.userId as string,
      friendId: this.friend?.id,
      messageIds
    });
  }

  private settingObserver(): void {
    this.observer = WindowHelper.generateResizeObserver((entry: ResizeObserverEntry) => {
      // if (this.shouldScroll) {
        this.scrollTop = entry.contentRect.height;
        this.shouldScroll = false;
      // }
    });
    this.observer.observe(this.tMessages?.nativeElement);
  }

  protected onDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   *  two consecutive message time points are not in the same minute.
   * @param compareLast compare with last or next item.
   */
  private isDiffMin(history: IMessage[], index: number, compareLast: boolean): boolean {
    if (compareLast ? index === 0 : index === history.length - 1) { return true; }
    else {
      const thisTimePoint = history[index].sendTime.toDate().toISOString().split(':')[1];
      const lastTimePoint = history[compareLast ? index - 1 : index + 1].sendTime.toDate().toISOString().split(':')[1];
      return thisTimePoint !== lastTimePoint;
    }
  }

  /**
   * two consecutive message sender are not the same id.
   * @param compareLast compare with last or next item.
   */
  private isDiffUser(history: IMessage[], index: number, record: IMessage, compareLast: boolean): boolean {
    return (compareLast ? index === 0 : index === history.length - 1) ? true
      : (record.sendTo !== history[compareLast ? index - 1 : index + 1].sendTo);
  }
}



