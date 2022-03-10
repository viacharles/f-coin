import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { LoadingComponent } from './loading/loading.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

@NgModule({
  declarations: [OverlayComponent, LoadingComponent, DialogComponent, DialogExampleComponent],
  imports: [CommonModule],
  exports: [OverlayComponent],
})
export class OverlayModule {}
