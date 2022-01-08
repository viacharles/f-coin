import { PostEditComponent } from '../sub-menu/components/post-edit/post-edit.component';
import { SharedWallComponent } from './pages/shared-wall/shared-wall.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SharedWallComponent
  },
  {
    path: 'shared-wall',
    component: SharedWallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
