import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { CoiningComponent } from './components/coining/coining.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { SharedModule } from '@shared/shared.module';
import { PostEditImageComponent } from './components/post-edit/post-edit-image/post-edit-image.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';



@NgModule({
  declarations: [
    ChatListComponent,
    CoiningComponent,
    AddFriendComponent,
    PostEditImageComponent,
    PostEditComponent
  ],
  exports: [
    ChatListComponent,
    CoiningComponent,
    AddFriendComponent,
    PostEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class SubMenuModule { }
