import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { CoiningComponent } from './components/coining/coining.component';



@NgModule({
  declarations: [ChatListComponent, CoiningComponent],
  exports: [ChatListComponent, CoiningComponent],
  imports: [
    CommonModule
  ]
})
export class SubMenuModule { }
