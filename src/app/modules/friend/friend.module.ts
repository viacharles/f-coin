import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendRoutingModule } from './friend-routing.module';
import { RecommendPageComponent } from './pages/recommend-page/recommend-page.component';


@NgModule({
  declarations: [RecommendPageComponent],
  imports: [
    CommonModule,
    FriendRoutingModule
  ]
})
export class FriendModule { }
