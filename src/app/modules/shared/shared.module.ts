import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from './overlay/overlay.module';
import { InputModule } from './input/input.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OverlayModule, InputModule, PipesModule],
  exports: [FormsModule, ReactiveFormsModule, OverlayModule, InputModule, PipesModule],
})
export class SharedModule { }
