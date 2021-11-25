import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '@user/user.guard';
import { EUserPage } from '@utility/enum/route.enum';


const routes: Routes = [{
  path: '',
  canActivate: [UserGuard],
  children: [{
    path: EUserPage.Chat,
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
