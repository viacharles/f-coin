import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenOverlayOutletComponent } from './components/full-screen-overlay-outlet/full-screen-overlay-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FullScreenOverlayOutletComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
