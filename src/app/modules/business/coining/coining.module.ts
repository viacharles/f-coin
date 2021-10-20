import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoiningRoutingModule } from './coining-routing.module';
import { CoiningPageComponent } from './pages/coining-page/coining-page.component';


@NgModule({
  declarations: [CoiningPageComponent],
  imports: [
    CommonModule,
    CoiningRoutingModule,
  ]
})
export class CoiningModule { }
