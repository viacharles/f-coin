import { IOverlayCallbacks } from './../../../../../utility/interface/overlay.interface';
import { ESize } from '@utility/enum/common.enum';
import { ChatDatepickerComponent } from './../../../user/shared/components/chat-datepicker/chat-datepicker.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { Component, ElementRef, EventEmitter, Output, OnInit, Input, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { TimeHelper } from '@utility/helper/time-helper';

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
    private selfElem: ElementRef,
    private $overlay: OverlayService,
    private renderer: Renderer2
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
      if (!/button|em/.test((event.target as HTMLElement).tagName.toLocaleLowerCase())) {
        this.isShow = this.isTargetInside(event, this.selfElem.nativeElement);
      }
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
      .filter(({ message }) => message.includes(this.keyword) && !!this.keyword)
      .map(({ id }) => id)
      .reverse();
    this.records.forEach(({ id, message }) => {
      const Element: HTMLElement = this.getLiElementById(id).getElementsByTagName('div')[1].getElementsByTagName('p')[0];
      Element.innerHTML = message.replace(new RegExp(`${this.keyword}`, 'g'), `<span class="matched-message">${this.keyword}</span>`);
    });
    if (this.matchMessageIds.length > 0) {
      this.switch(0);
    }
  }

  public switch(offset: number, event?: MouseEvent): void {
    event?.stopPropagation();
    if (this.matchMessageIds.length > 0) {
      this.current = this.current + offset;
      this.getLiElementById(this.matchMessageIds[this.current]).scrollIntoView();
    }
  }

  public toggleCalender(element: HTMLElement): void {
    const { top, height, left } = element.getBoundingClientRect();
    this.$overlay.toggleDialog<{ records: IMessage[] }>(
      ChatDatepickerComponent,
      {
        config: {
          records: this.records,
        },
        options: {
          location: {
            x: -(document.body.clientWidth - left + 8),
            y: top + height + 10
          },
          draggable: true,
          backdrop: false,
          isMiniWindow: true
        },
        callbacks: {
          confirm: date => {
            this.toSelect(date);
          }
        } as IOverlayCallbacks,
        size: ESize.FitContent
      }
    );
  }

  public reset(): void {
    this.keyword = '';
    this.search();
  }

  /**
   * @description 畫面跳到選取的日期的最早的訊息上
   * @param event 格式：YYYY-MM-DD
   */
  private toSelect(event: string): void {
    const Id = this.records.find(message =>
      TimeHelper.formatDate(message.sendTime.toDate(), 'YYYY-MM-DD') === event
      )?.id as string;
    const SelectElement = this.getLiElementById(Id);
    SelectElement.scrollIntoView();
    this.shake(SelectElement);
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

  private shake(element: HTMLElement): void {
    this.renderer.addClass(element, 'shake');
    setTimeout(() => {
      this.renderer.removeClass(element, 'shake');
    }, 2000);
  }

  ngOnDestroy(): void {
    const [ClickEvent, DoubleClickEvent] = this.eventListeners;
    document.removeEventListener('click', ClickEvent);
    document.removeEventListener('dblclick', DoubleClickEvent);
    this.reset();
  }
}
