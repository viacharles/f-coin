import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Module, Page } from '@utility/enum/route.enum';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: `${Module.User}/${Page.Chat}`},
  {path: '',
  children: [
    {
      path: Module.Business,
      loadChildren: () => import('./modules/business/business.module').then(m => m.BusinessModule)
    },
    {
      path: Module.User,
      loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
