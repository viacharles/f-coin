import { OverlayModule } from './../overlay/overlay.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { ChatDatepickerComponent } from '@user/shared/components/chat-datepicker/chat-datepicker.component';

@NgModule({
  declarations: [CalendarComponent, ChatDatepickerComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [CalendarComponent, ChatDatepickerComponent]
})
export class CommonsModule { }
