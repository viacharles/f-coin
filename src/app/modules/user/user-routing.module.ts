import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '@user/user.guard';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';

const routes: Routes = [{
  path: '',
  canActivate: [UserGuard],
  children: [{
    path: Page.Chat,
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
