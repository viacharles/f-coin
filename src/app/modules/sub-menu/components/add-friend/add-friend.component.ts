import { environment } from 'src/environments/environment';
import { AddFriendService } from './add-friend.service';
import { FriendPageMap } from '@utility/map/router.map';
import { UserPageMap } from '@utility/map/router.map';
import { EFriendPage, EModule, EUserPage } from '@utility/enum/route.enum';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from '@utility/interface/user.interface';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent {

  @Input() user?: User;
  @Output() switchToChat = new EventEmitter<void>();

  constructor(
    public $user: UserService,
    private $feature: AddFriendService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  public form: FormGroup = this.fb.group({
    id: [null, [Validators.required, this.idValidator]]
  });

  public result?: IUser | null;
  public isSubmit = false;
  public defaultAvatar = environment.defaultAvatar;

  get alreadyExist(): boolean {
    return this.user?.friends.includes((this.result as IUser)?.id) || false;
  }

  public clearInput(): void {

  }

  public afterKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.isSubmit = true;
    }
  }


  public addAsFriend(): void {
    // this.$feature.fireEvent<void>({
    //   action: Action.AddFriend,
    //   user: this.user as User,

    // }).then(() => {

    // });
  }

  public toChat(): void {
    // this.router.navigateByUrl(`${EModule.User}/${UserPageMap.get(EUserPage.Chat)?.path}/${this.searchResultView?.id}`);
    this.switchToChat.emit();
  }

  public toFriendPage(): void {
    this.router.navigateByUrl(`${EModule.Friend}/${FriendPageMap.get(EFriendPage.Recommend)?.path}`);
  }

  /**
   * @description 搜尋使用者id，如果是有註冊在userCenter裡的id，就將資料顯示在畫面上
   */
  public search(): void {
    this.isSubmit = true;
    setTimeout(() => {
      this.result = { id: this.user?.friends[0], name: 'test' } as IUser
    }, 1000);
  }

  /**
   * @description id驗證項目，不可為空格且只能含有英文及數字
   */
  private idValidator({ value }: AbstractControl): ValidationErrors | null {
    const Id = value?.trim();
    return Id?.length > 0 && /^\w+$/.test(Id) ? null : { invalid: true };
  }
}
