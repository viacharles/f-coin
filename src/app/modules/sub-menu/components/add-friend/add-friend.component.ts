import { FriendPageMap } from './../../../../../utility/map/router.map';
import { UserPageMap } from '@utility/map/router.map';
import { EFriendPage, EModule, EUserPage } from '@utility/enum/route.enum';
import { Router } from '@angular/router';
import { IFriend } from '@utility/interface/user.interface';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';

enum EResult {
  NoResult = 0,
  InFriends,
  Self,
  Add,
  WrongInput
}

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  @Input() user: User | null = null;
  @Output() switchToChat = new EventEmitter<void>();

  constructor(public $user: UserService, private $fb: FirebaseService, private router: Router) { }

  public searchResultType: EResult | null = null;
  public searchResultView: IFriend | null = null;
  public searchString = '';

  ngOnInit(): void {
  }

  get showProfiles() {
    return this.searchResultView &&
      (this.searchResultType === EResult.InFriends ||
        this.searchResultType === EResult.Add || 
        this.searchResultType === EResult.Self
        )
  }

  get EResult() {
    return EResult;
  }

  public clearInput(): void {
    this.searchString = '';
    this.searchResultType = null;
  }

  public afterKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.searchFriend(this.searchString)
    }
  }

  public afterClickSearch(): void {
    this.searchFriend(this.searchString);
  }

  public addAsFriend() {
    this.user?.addFriends(this.searchResultView?.id as string);
    this.$fb.getDoc('user', this.user?.id as string).update({ friends: this.user?.friends })
      .then(() => {
        this.searchString = '';
        this.searchResultView = null;
        alert(`成功加入好友!`)
      });
  }

  public toChat(): void {
    this.router.navigateByUrl(`${EModule.User}/${UserPageMap.get(EUserPage.Chat)?.path}/${this.searchResultView?.id}`);
    this.switchToChat.emit();
  }

  public toFriendPage(): void {
    this.router.navigateByUrl(`${EModule.Friend}/${FriendPageMap.get(EFriendPage.Recommend)?.path}`)
  }

  /**
   * @description 搜尋使用者id，如果是有註冊在userCenter裡的id，就將資料顯示在畫面上
   * @param input 
   */
  private searchFriend(id: string): void {
    const queryId = id.trim();
    if (queryId !== '' && /^\w+$/.test(queryId)) {
      const findInFriends = (this.user?.friends as string[]).find(id => id === queryId);
      const isSelf = (this.user?.id as string) === queryId;
      console.log('isSelf', isSelf)
      let findInUserCenter: string | undefined;
      this.$fb.request('user').read()
        .then((resFriends: { key: string, value: IFriend }[]) => 
          findInUserCenter = (resFriends.find(resFriend => resFriend.key === queryId))?.key as string | undefined)
        .then(() => {
          if (findInUserCenter !== undefined) {
            this.$fb.request('user').read(queryId).then((friend: IFriend) => {
              this.searchResultView = friend
            });
          }
          this.searchResultType = findInUserCenter !== undefined
                                ? findInFriends === undefined
                                ? isSelf
                                ? EResult.Self
                                : EResult.Add
                                : EResult.InFriends
                                : EResult.NoResult;
        });
    }
    else {
      this.searchResultType = EResult.WrongInput;
    }
  }
}
