import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '@shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { SubMenuModule } from '../sub-menu/sub-menu.module';
import { SignOnPageComponent } from './pages/sign-on-page/sign-on-page.component';
import { PostEditComponent } from '@sub-menu/components/post-edit/post-edit.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LandingPageComponent,
    SignOnPageComponent,
    MenuComponent,
    PostEditComponent
  ],
  imports: [CommonModule, AppRoutingModule, SharedModule, SubMenuModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
