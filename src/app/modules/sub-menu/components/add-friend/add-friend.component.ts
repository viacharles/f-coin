import { UserPageMap } from '@utility/map/router.map';
import { EModule, EUserPage } from '@utility/enum/route.enum';
import { Router } from '@angular/router';
import { IFriend } from '@utility/interface/user.interface';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { User } from '@user/shared/models/user.model';

enum EResult {
  NoResult = 0,
  InFriends,
  Add,
  WrongInput
}

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  @ViewChild('tInput') tInput: HTMLInputElement | null = null;
  @Input() user: User | null = null;
  @Output() switchToChat = new EventEmitter<void>();

  constructor(public $user: UserService, private $fb: FirebaseService, private router: Router) { }

  public searchResultType: EResult | null = null;
  public searchResultView: IFriend | null = null;

  ngOnInit(): void {
  }

  get showProfiles() {
    return this.searchResultView &&
      (this.searchResultType === EResult.InFriends ||
        this.searchResultType === EResult.Add)
  }

  get EResult() {
    return EResult;
  }

  public clearInput(element: HTMLInputElement): void {
    element.value = '';
  }

  public afterKeyDown(event: KeyboardEvent): void {
    console.log('afterKeyDown')
    if (event.code === 'Enter') {
      this.searchFriend((<HTMLInputElement>event.target)?.value)
    }
  }

  public afterClickSearch(element: HTMLInputElement): void {
    this.searchFriend(element.value);
  }

  public addAsFriend() {
    this.user?.addFriends(this.searchResultView?.id as string);
    this.$fb.getDoc('user', this.user?.id as string).update({ friends: this.user?.friends })
      .then(() => {
        (<HTMLInputElement>this.tInput).value = '';
        this.searchResultView = null;
        alert(`成功加入好友！`)
      });
  }

  public toChat(): void {
    this.router.navigateByUrl(`${EModule.User}/${UserPageMap.get(EUserPage.Chat)?.path}/${this.searchResultView?.id}`);
    this.switchToChat.emit();
  }

  /**
   * @description 搜尋使用者id，如果是有註冊在userCenter裡的id，就將資料顯示在畫面上
   * @param input 
   */
  private searchFriend(id: string): void {
    const queryId = id.trim();
    if (queryId !== '' && queryId.match(/\w/g) !== null) {
      const findInFriends = (this.user?.friends as string[]).find(id => id === queryId);
      console.log('searchFriend', this.user, findInFriends)
      let findInUserCenter: string | undefined;
      this.$fb.request('user').read()
        .then((ids: { key: string, value: IFriend }[]) => findInUserCenter = (ids.find(id => id.key === queryId))?.key as string | undefined)
        .then(() => {
          if (findInUserCenter !== undefined) {
            this.$fb.request('user').read(queryId).then((friend: IFriend) => {
              this.searchResultView = friend
            });
          }
          this.searchResultType = findInUserCenter !== undefined
            ? findInFriends === undefined
              ? EResult.Add
              : EResult.InFriends
            : EResult.NoResult;
          console.log('this.searchResultType', this.searchResultType)


        });
    }
    else {
      this.searchResultType = EResult.WrongInput;
    }
  }
}
