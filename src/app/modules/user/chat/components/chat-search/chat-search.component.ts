import { IMessage } from '@utility/interface/messageCenter.interface';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '@utility/base/base-component';

@Component({
  selector: 'app-chat-announcement',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.scss']
})
export class ChatSearchComponent extends BaseComponent {

  @Input() records: IMessage[] = [];
  @Input() DOMTree!: HTMLUListElement;
  @Input() searchElement!: HTMLInputElement;
  constructor() {
    super();
  }

  /**
   * @description 當前關鍵字
   */
  public keyword = '';
  /**
   * @description 所有符合條件的聊天紀錄id
   */
  public matchMessageIds: string[] = [];
  public current = 0;

  public switch(offset: number): void {
    if (this.matchMessageIds.length > 0) {
      this.current = this.current + offset;
      this.getLiElementById(this.matchMessageIds[this.current]).scrollIntoView();
    }
  }

  public afterKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.keyword?.trim() !== '' && !event.isComposing) {
      this.matchMessageIds = this.records
        .filter(({ message }) => message.includes(this.keyword))
        .map(({ id }) => id)
        .reverse();
      this.records.forEach(({ id, message }) => {
        const Element: HTMLElement = this.getLiElementById(id).getElementsByTagName('div')[1].getElementsByTagName('p')[0]
        Element.innerHTML = message.replace(new RegExp(`${this.keyword}`, 'g'), `<span class="text-danger">${this.keyword}</span>`);
      });
      if (this.matchMessageIds.length > 0) {
        this.switch(0);
      }
    }
  }

  private getLiElementById(id: string): HTMLElement {
    return this.DOMTree.getElementsByClassName('message').namedItem(id) as HTMLElement;
  }
}
