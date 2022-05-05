import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollControlDirective } from './scroll-control.directive';



@NgModule({
  declarations: [ScrollControlDirective],
  exports: [ScrollControlDirective],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
