import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { FullScreenOverlayOutletComponent } from './components/full-screen-overlay-outlet/full-screen-overlay-outlet.component';



@NgModule({
  declarations: [FullScreenOverlayOutletComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
