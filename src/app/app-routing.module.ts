import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EIndividualPage, EModule } from '@utility/enum/route.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { LandingPageComponent } from './modules/layout/pages/landing-page/landing-page.component';
import { SignOnPageComponent } from './modules/layout/pages/sign-on-page/sign-on-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: EModule.User,
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: EIndividualPage.Landing,
    component: LandingPageComponent,
  },
  {
    path: EIndividualPage.SignOn,
    component: SignOnPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}