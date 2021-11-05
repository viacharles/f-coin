import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    MainMenuComponent,
    MainFooterComponent,
    HeaderComponent,
    LandingPageComponent,
  ],
  imports: [CommonModule, AppRoutingModule, SharedModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
