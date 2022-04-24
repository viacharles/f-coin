import { IMessage } from '@utility/interface/messageCenter.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@utility/base/base-component';

@Component({
  selector: 'app-chat-announcement',
  templateUrl: './chat-announcement.component.html',
  styleUrls: ['./chat-announcement.component.scss']
})
export class ChatAnnouncementComponent extends BaseComponent {
  @Input() records: IMessage[] = [];
  @Input() DOMTree!: HTMLUListElement;
  /**
   * @description 滑動scroll到特定位置
   */
  @Output() moveTo = new EventEmitter<number>();
  constructor() {
    super();
  }

  /**
   * @description 當前關鍵字
   */
  public keyword: string = '';
  /**
   * @description 所有符合條件的聊天紀錄
   */
  public matchMessages: IMessage[] = [];

  ngOnInit(): void {

  }

  public afterKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.keyword?.trim() !== '' && !event.isComposing) {
      this.matchMessages = this.records.filter(({ message }) => message.includes(this.keyword));
      this.matchMessages.forEach(message => this.highlightKeyword(message));
    }
  }

  private highlightKeyword({ id, message }: IMessage) {
    document.getElementById(id)!.innerHTML = message.replace(this.keyword, `<span class="text-danger">${this.keyword}</span>`)
  }

}
