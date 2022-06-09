import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogComponent } from '@shared/overlay/dialog/dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { BaseDialog } from '@utility/base/base-dialog';
import { IUser, IUserProfileDialog } from '@utility/interface/user.interface';
import { FileService } from '@shared/services/file.service';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent extends BaseDialog<IUserProfileDialog> {

  constructor(
    $overlay: OverlayService, dialog: DialogComponent,
    private fb: FormBuilder,
    private $file: FileService
  ) {
    super($overlay, dialog);
  }

  get userInfo() { return this.config?.user as IUser }

  public form: FormGroup = this.fb.group({
    name: [null],
    avatar: [null],
    totalAssets: [null]
  });

  protected onInit() {
    this.form.setValue({
      name: this.userInfo.name,
      avatar: this.userInfo.avatar || environment.defaultAvatar,
      totalAssets: this.userInfo.totalAssets
    });
  }

  public uploadAvatar(target: EventTarget) {
    this.$file.formatFileToBase64((target as HTMLInputElement).files![0]).then(avatar => console.log(avatar));
  }

}
