import { Component, ElementRef, EventEmitter, Output, OnInit, Input, OnDestroy } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';
import { IMessage } from '@utility/interface/messageCenter.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [getFormProvider(SearchInputComponent)]
})
export class SearchInputComponent extends CustomForm<string> implements OnInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();
  @Input() DOMTree!: HTMLUListElement;
  @Input() searchElement!: HTMLInputElement;
  @Input() records: IMessage[] = [];

  constructor(
    private selfElem: ElementRef
  ) { super(); }

  get keyword(): string { return this.model as string; }
  set keyword(input: string) {
    this.model = input;
    this.notifyValueChange();
  }

  /**
   * @description 是否顯示 下拉選項
   */
  public isShow = false;

  /**
   * 事件監聽器列表
   */
  private eventListeners: any[] = [];

  public matchMessageIds: string[] = [];

  public current = 0;

  ngOnInit(): void {
    this.eventListeners.push(document.addEventListener('click', event => {
      this.isShow = this.isTargetInside(event, this.selfElem.nativeElement);
      }));
    this.eventListeners.push(document.addEventListener('dblclick', event => {
      if (!this.isTargetInside(event, this.selfElem.nativeElement)) {
        this.closed.emit();
      }
    }));
  }

  public afterKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.keyword?.trim() !== '' && !event.isComposing) {
      this.search();
    }
  }

  public search(): void {
    this.isShow = false;
    this.matchMessageIds = this.records
    .filter(({ message }) => message.includes(this.keyword))
    .map(({ id }) => id)
    .reverse();
    this.records.forEach(({ id, message }) => {
      const Element: HTMLElement = this.getLiElementById(id).getElementsByTagName('div')[1].getElementsByTagName('p')[0]
      Element.innerHTML = message.replace(new RegExp(`${this.keyword}`, 'g'), `<span class="matched-message">${this.keyword}</span>`);
    });
    if (this.matchMessageIds.length > 0) {
      this.switch(0);
    }
  }

  public switch(offset: number): void {
    if (this.matchMessageIds.length > 0) {
      this.current = this.current + offset;
      this.getLiElementById(this.matchMessageIds[this.current]).scrollIntoView();
    }
  }

  private getLiElementById(id: string): HTMLElement {
    return this.DOMTree?.getElementsByClassName('message').namedItem(id) as HTMLElement;
  }

  /**
   * @description 當前事件目標是否位於指定標籤內部
   * @param html 指定標籤
   */
  private isTargetInside({ target }: MouseEvent, html: HTMLElement): boolean {
    return html.contains(target as HTMLElement);
  }

  ngOnDestroy(): void {
    const [ClickEvent, DoubleClickEvent] = this.eventListeners;
    document.removeEventListener('click', ClickEvent);
    document.removeEventListener('dblclick', DoubleClickEvent);
}
}
