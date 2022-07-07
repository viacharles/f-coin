import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollControlDirective } from './scroll-control.directive';
import { DragMoveDirective } from './drag-move.directive';



@NgModule({
  declarations: [ScrollControlDirective, DragMoveDirective],
  exports: [ScrollControlDirective, DragMoveDirective],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
