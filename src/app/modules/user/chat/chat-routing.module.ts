import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EUserPage } from '@utility/enum/route.enum';
import { UserPageMap } from '@utility/map/router.map';
import { ChatComponent } from './pages/chat/chat.component';

const routes: Routes = [
  {
    path: UserPageMap.get(EUserPage.Chat)?.path.replace(
      new RegExp(`${EUserPage.Chat}`),
      ''
    ),
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
