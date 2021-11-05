import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Module, Page } from '@utility/enum/route.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { LandingPageComponent } from './modules/layout/pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: Module.Business,
        loadChildren: () =>
          import('./modules/business/business.module').then(
            (m) => m.BusinessModule
          ),
      },
      {
        path: Module.User,
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'landing',
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
