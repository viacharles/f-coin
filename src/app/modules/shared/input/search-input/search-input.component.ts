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
  @Output() keyDown = new EventEmitter<KeyboardEvent>();
  @Output() closed = new EventEmitter<void>();
  @Input() DOMTree?: HTMLUListElement;
  @Input() searchElement?: HTMLInputElement;
  @Input() records!: IMessage[];

  constructor(
    private selfElem: ElementRef
  ) { super(); }

  get keyword(): string { return this.model as string; }
  set keyword(input: string) {
    this.model = input;
    this.notifyValueChange();
  }

  public isShow = false;
  /**
   * 事件監聽器列表
   */
  private eventListeners: any[] = [];


  public matchMessageIds: string[] = [];

  public current = 0;

  ngOnInit(): void {
    this.eventListeners.push(document.addEventListener('click', event =>
      this.isShow = this.isTargetInside(event, this.selfElem.nativeElement)));
    this.eventListeners.push(document.addEventListener('dblclick', event => {
      if (!this.isTargetInside(event, this.selfElem.nativeElement)) {
        this.closed.emit();
      }
    }));
  }

  ngOnDestroy(): void {
    const [ClickEvent, DoubleClickEvent] = this.eventListeners;
    document.removeEventListener('click', ClickEvent);
    document.removeEventListener('dblclick', DoubleClickEvent);
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.keyword.trim() !== '' && !event.isComposing) {
      this.matchMessageIds =
        this.records
          .filter(record => record.message.includes(this.keyword))
          .map(({ id }) => id);
    }
  }

  public switch(offset: number): void {
    this.current += offset;
    this.getLiElementById(this.matchMessageIds[this.current]).scrollIntoView();
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

}
