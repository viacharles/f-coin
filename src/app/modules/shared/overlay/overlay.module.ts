import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [OverlayComponent, LoadingComponent],
  imports: [CommonModule],
  exports: [OverlayComponent],
})
export class OverlayModule {}
