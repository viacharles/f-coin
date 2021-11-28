import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { OverlayModule } from '@shared/overlay/overlay.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    LayoutModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
