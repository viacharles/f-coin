import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [LayoutComponent, MainMenuComponent, MainFooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
