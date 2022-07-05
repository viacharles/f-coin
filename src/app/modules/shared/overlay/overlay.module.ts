import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { LoadingComponent } from './loading/loading.component';
import { DialogComponent } from './dialog/dialog.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

@NgModule({
  declarations: [OverlayComponent, LoadingComponent, DialogComponent, UploadDialogComponent],
  imports: [CommonModule],
  exports: [OverlayComponent, DialogComponent],
})
export class OverlayModule { }
