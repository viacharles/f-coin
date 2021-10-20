import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';

const routes: Routes = [{
  path: Page.FCoin,
  loadChildren: () => import('./coining/coining.module').then(m => m.CoiningModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
