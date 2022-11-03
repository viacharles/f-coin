import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { LoadingComponent } from './loading/loading.component';
import { DialogComponent } from './dialog/dialog.component';
import { DirectiveModule } from '@shared/directive/directive.module';

@NgModule({
  declarations: [OverlayComponent, LoadingComponent, DialogComponent],
  imports: [CommonModule, DirectiveModule],
  exports: [OverlayComponent, DialogComponent],
})
export class OverlayModule { }
