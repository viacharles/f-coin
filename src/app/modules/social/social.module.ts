import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialRoutingModule } from './social-routing.module';
import { SharedWallComponent } from './pages/shared-wall/shared-wall.component';


@NgModule({
  declarations: [SharedWallComponent],
  imports: [
    CommonModule,
    SocialRoutingModule
  ]
})
export class SocialModule { }
