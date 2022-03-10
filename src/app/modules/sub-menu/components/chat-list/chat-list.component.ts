import {
  Component,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { Friend } from '@friend/shared/models/friend.model';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from '@user/shared/models/user.model';
import { BaseSubMenu } from '@utility/base/base-sub-menu';
import { EModule } from '@utility/enum/route.enum';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent extends BaseSubMenu {

  constructor(
    private $user: UserService,
    public router: Router
  ) {
    super();
  }

  /**
   * @description 因sub menu不放在router outlet中，故無法透過activatedRoute獲得路由參數
   */
  get activatedFriendId(): string {
    const Array = this.router.url.split('/');
    return Array[Array.length - 1];
  }

  public friends$ = this.$user.friends$.pipe(
    tap((friends) => this.onFriendsUpdated(friends))
  );

  protected onChanges({ user }: SimpleChanges): void {
    if (user.currentValue.id === sessionStorage.getItem('id')) {
      this.$user.fetchFriendList(user.currentValue as User);
    }
  }

  public toAddFriend(): void {
    this.updateModule.emit(EModule.Friend);
  }

  private onFriendsUpdated(friends: Friend[]): void { }
}
