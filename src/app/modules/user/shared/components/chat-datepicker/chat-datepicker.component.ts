import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '@shared/overlay/dialog/dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { BaseDialog } from '@utility/base/base-dialog';
import { TimeHelper } from '@utility/helper/time-helper';
import { IMessage } from '@utility/interface/messageCenter.interface';

@Component({
  selector: 'app-chat-datepicker',
  templateUrl: './chat-datepicker.component.html',
  styleUrls: ['./chat-datepicker.component.scss']
})
export class ChatDatepickerComponent extends BaseDialog<{records: IMessage[]}> {

  constructor($overlay: OverlayService, dialog: DialogComponent) {
    super($overlay, dialog);
  }

  /** 套上fade style的日期 */
  public fadeDates: string[] = [];
  /** 初始被選取的日期 */
  public initialDate = '';

  protected onInit(): void {
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
}
