import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizePipe } from './sanitize.pipe';
import { ChatTimePipe } from './chat-time.pipe';
import { ChatDatePipe } from './chat-date.pipe';
import { ChatListDatePipe } from './chat-list-date.pipe';



@NgModule({
  declarations: [SanitizePipe, ChatTimePipe, ChatDatePipe, ChatListDatePipe],
  imports: [
    CommonModule
  ],
  exports: [SanitizePipe, ChatTimePipe, ChatDatePipe, ChatListDatePipe]
})
export class PipesModule { }
