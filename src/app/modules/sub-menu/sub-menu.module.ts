import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { CoiningConsoleComponent } from './components/coining-console/coining-console.component';



@NgModule({
  declarations: [ChatListComponent, CoiningConsoleComponent],
  exports: [ChatListComponent, CoiningConsoleComponent],
  imports: [
    CommonModule
  ]
})
export class SubMenuModule { }
