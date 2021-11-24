import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullScreenOverlayOutletComponent } from './components/full-screen-overlay-outlet/full-screen-overlay-outlet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullScreenLoaderComponent } from './components/loader/full-screen-loader/full-screen-loader.component';

@NgModule({
  declarations: [FullScreenOverlayOutletComponent, FullScreenLoaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, FullScreenLoaderComponent],
})
export class SharedModule {}
