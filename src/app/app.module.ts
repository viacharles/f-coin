import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { OverlayModule } from '@shared/overlay/overlay.module';
import { Level, NgLoggerModule } from '@nsalaun/ng-logger';

let LOG_LEVEL = Level.LOG;
if (environment.production) {
  LOG_LEVEL = Level.ERROR;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    LayoutModule,
    OverlayModule,
    NgLoggerModule.forRoot(LOG_LEVEL),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
