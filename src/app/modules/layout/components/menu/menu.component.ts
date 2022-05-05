import { IMessage } from './../../../../../utility/interface/messageCenter.interface';
import { IUserProfileDialog } from '@utility/interface/user.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';
import { UserProfileDialogComponent } from '@user/shared/components/user-profile-dialog/user-profile-dialog.component';
import { User } from '@user/shared/models/user.model';
import { EModule } from '@utility/enum/route.enum';
import { MenuMap } from '@utility/map/router.map';
import { AuthService } from 'src/auth/auth.service';
import { BaseComponent } from '@utility/base/base-component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends BaseComponent {
  @Output() moduleChanged = new EventEmitter<EModule>();
  @Input() module: EModule = EModule.User;
  @Input() messages: IMessage[] = [];

  constructor(
    public $auth: AuthService,
    private $overlay: OverlayService
  ) {
    super();
  }

  public readonly Menu = MenuMap;
  /**
   * @description 所有未讀訊息
   */
  get unreadMessages(): IMessage[] { return this.messages.filter(({ isRead, sendTo }) => !isRead && sendTo === this.user.id); }
  get moduleType(): typeof EModule { return EModule; }

  public toggleProfileDialog(): void {
    this.$overlay.toggleDialog<IUserProfileDialog>(UserProfileDialogComponent, {
      config: {
        user: this.user as User
      },
      options: {
        backdropClose: true
      }
    });
  }

  /** 顯示聊天室 ICON 記號 */
  public showUserMark(key: EModule): boolean {
    return key === EModule.User && (this.unreadMessages.length as number) > 0;
  }

  /** 顯示加入好友 ICON 記號 */
  public showFriendMark(key: EModule): boolean {
    return key === EModule.Friend && this.user?.inviteAddFriends.length !== 0;
  }
}
