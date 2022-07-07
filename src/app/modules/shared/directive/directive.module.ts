import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollControlDirective } from './scroll-control.directive';
import { DragMoveDirective } from './drag-move.directive';
import { DropUploadDirective } from './drop-upload.directive';



@NgModule({
  declarations: [ScrollControlDirective, DragMoveDirective, DropUploadDirective],
  exports: [ScrollControlDirective, DragMoveDirective],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
