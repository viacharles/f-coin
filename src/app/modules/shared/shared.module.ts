import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from './overlay/overlay.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OverlayModule],
  exports: [FormsModule, ReactiveFormsModule, OverlayModule],
})
export class SharedModule {}
