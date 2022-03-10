import { IUserProfileDialog } from '@utility/interface/user.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';
import { UserProfileDialogComponent } from '@user/shared/components/user-profile-dialog/user-profile-dialog.component';
import { User } from '@user/shared/models/user.model';
import { EModule } from '@utility/enum/route.enum';
import { MenuMap } from '@utility/map/router.map';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() moduleChanged = new EventEmitter<EModule>();
  @Input() module: EModule = EModule.User;
  @Input() user?: User;

  constructor(
    public $auth: AuthService,
    private $overlay: OverlayService
  ) { }

  public readonly Menu = MenuMap;

  public toggleProfileDialog() {
    this.$overlay.toggleDialog<IUserProfileDialog>(UserProfileDialogComponent, {
      config: {
        user: this.user as User
      },
      options: {
        backdropClose: true
      }
    });
  }
}
