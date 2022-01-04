import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { CoiningComponent } from './components/coining/coining.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';



@NgModule({
  declarations: [ChatListComponent, CoiningComponent, AddFriendComponent],
  exports: [ChatListComponent, CoiningComponent, AddFriendComponent],
  imports: [
    CommonModule
  ]
})
export class SubMenuModule { }
