import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogComponent } from '@shared/overlay/dialog/dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { BaseDialog } from '@utility/base/base-dialog';
import { IUser, IUserProfileDialog } from '@utility/interface/user.interface';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent extends BaseDialog<IUserProfileDialog> {

  constructor(
    $overlay: OverlayService, dialog: DialogComponent,
    private fb: FormBuilder
  ) {
    super($overlay, dialog);
  }

  get user() { return this.config?.user as IUser }

  public form: FormGroup = this.fb.group({
    name: [null],
    avatar: [null],
    totalAssets: [null]
  });

  protected onInit() {
    this.form.setValue({
      name: this.user.name,
      avatar: this.user.avatar || environment.defaultAvatar,
      totalAssets: this.user.totalAssets
    });
  }



}
