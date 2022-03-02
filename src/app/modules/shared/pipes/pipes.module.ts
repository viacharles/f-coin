import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizePipe } from './sanitize.pipe';
import { ChatTimePipe } from './chat-time.pipe';
import { ChatDatePipe } from './chat-date.pipe';



@NgModule({
  declarations: [SanitizePipe, ChatTimePipe, ChatDatePipe],
  imports: [
    CommonModule
  ],
  exports: [SanitizePipe, ChatTimePipe, ChatDatePipe]
})
export class PipesModule { }
