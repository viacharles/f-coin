import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { getPageMap } from '@utility/map/router.map';
import { CoiningPageComponent } from './pages/coining-page/coining-page.component';

// const RoutePage = getPageMap(Module.Coin);

const routes: Routes = [
  { path: '', component: CoiningPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoiningRoutingModule { }
