import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { SharedModule } from '@shared/shared.module';
import { ChatAnnouncementComponent } from './components/chat-announcement/chat-announcement.component';

@NgModule({
  declarations: [ChatComponent, ChatAnnouncementComponent],
  imports: [SharedModule, CommonModule, ChatRoutingModule],
})
export class ChatModule {}
