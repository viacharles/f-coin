import { PipesModule } from './../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileDialogComponent } from './shared/components/user-profile-dialog/user-profile-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { ChatDatepickerComponent } from './shared/components/chat-datepicker/chat-datepicker.component';


@NgModule({
  declarations: [UserProfileDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
