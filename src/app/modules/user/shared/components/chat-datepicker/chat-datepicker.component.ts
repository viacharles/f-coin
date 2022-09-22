import { TimeHelper } from './../../../../../../utility/helper/time-helper';
import { IMessage } from './../../../../../../utility/interface/messageCenter.interface';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { DialogComponent } from '@shared/overlay/dialog/dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { BaseDialog } from '@utility/base/base-dialog';

@Component({
  selector: 'app-chat-datepicker',
  templateUrl: './chat-datepicker.component.html',
  styleUrls: ['./chat-datepicker.component.scss']
})
export class ChatDatepickerComponent extends BaseDialog<{records: IMessage[], DOMTree: HTMLUListElement}> implements OnInit {

  constructor($overlay: OverlayService, dialog: DialogComponent, private renderer: Renderer2) {
    super($overlay, dialog);
  }

  public fadeDates: string[] = [];
  /** 初始被選取的日期 */
  public initialDate = '';

  ngOnInit(): void {
    this.params.config?.records.forEach((message, index, arr) => {
      if (index === 0 ||
          TimeHelper.formatMoment(message.sendTime.toDate()).format('yyyy-MM-DD')
          !== TimeHelper.formatMoment(arr[index - 1].sendTime.toDate()).format('yyyy-MM-DD'))
      {
        this.fadeDates.push(TimeHelper.formatMoment(message.sendTime.toDate()).format('yyyy-MM-DD'));
      }
    });
    this.initialDate = this.fadeDates[this.fadeDates.length - 1 ];
  }

  /**
   * @description 畫面跳到選取的日期的最早的訊息上
   * @param event 格式：YYYY-MM-DD
   */
  public toSelect(event: string): void {
    const Id = this.params.config?.records.find(message =>
      TimeHelper.formatDate(message.sendTime.toDate(), 'YYYY-MM-DD') === event
      )?.id as string;
    const SelectElement = this.getElementById(Id);
    SelectElement.scrollIntoView();
    this.shake(SelectElement);
  }

  private getElementById(id: string): HTMLLIElement {
    return this.params.config?.DOMTree.getElementsByClassName('message').namedItem(id) as HTMLLIElement;
  }

  private shake(element: HTMLLIElement): void {
    this.renderer.addClass(element, 'shake');
  }
}
