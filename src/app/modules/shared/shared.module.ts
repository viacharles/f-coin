import { DirectiveModule } from './directive/directive.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from './overlay/overlay.module';
import {
  CommonsModule,
  InputModule,
  PipesModule
} from '@shared/index';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OverlayModule, InputModule, PipesModule, DirectiveModule, CommonsModule],
  exports: [FormsModule, ReactiveFormsModule, OverlayModule, InputModule, PipesModule, DirectiveModule, CommonsModule],
})
export class SharedModule { }
