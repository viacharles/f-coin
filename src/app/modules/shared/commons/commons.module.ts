import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@shared/calendar/calendar.component';



@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [CalendarComponent]
})
export class CommonsModule { }
