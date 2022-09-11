import { CalendarComponent } from './modules/shared/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EIndividualPage, EModule } from '@utility/enum/route.enum';
import { map } from 'rxjs/operators';
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
      {
        path: EModule.Friend,
        loadChildren: () =>
          import('./modules/friend/friend.module').then((m) => m.FriendModule),
      },
      {
        path: EModule.Business,
        loadChildren: () =>
          import('./modules/business/business.module').then((m) => m.BusinessModule),
      },
      {
        path: EModule.Social,
        loadChildren: () =>
          import('./modules/social/social.module').then((m) => m.SocialModule),
      }
    ],
  },
  {
    path: EIndividualPage.Landing,
    component: LandingPageComponent,
  },
  {
    path: EIndividualPage.SignOn,
    component: SignOnPageComponent,
  },
  {
    path: EIndividualPage.Calendar,
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
