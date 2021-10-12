import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoiningRoutingModule } from './coining-routing.module';
import { FCoinPageComponent } from './pages/f-coin-page/f-coin-page.component';


@NgModule({
  declarations: [FCoinPageComponent],
  imports: [
    CommonModule,
    CoiningRoutingModule
  ]
})
export class CoiningModule { }
