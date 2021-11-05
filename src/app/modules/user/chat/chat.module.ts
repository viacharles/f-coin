import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatroomListComponent } from './pages/chatroom-list/chatroom-list.component';


@NgModule({
  declarations: [ChatroomListComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
  ]
})
export class ChatModule { }
