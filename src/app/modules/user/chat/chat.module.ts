import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './pages/chat/chat.component';
import { SharedModule } from '@shared/shared.module';
import { ChatSearchComponent } from './components/chat-search/chat-search.component';

@NgModule({
  declarations: [ChatComponent, ChatSearchComponent],
  imports: [SharedModule, CommonModule, ChatRoutingModule],
})
export class ChatModule {}
