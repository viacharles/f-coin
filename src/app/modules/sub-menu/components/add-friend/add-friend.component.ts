import { UserPageMap } from '@utility/map/router.map';
import { EModule, EUserPage } from '@utility/enum/route.enum';
import { Router } from '@angular/router';
import { IUser, IFriend } from '@utility/interface/user.interface';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { tap } from 'rxjs/operators';

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

  @ViewChild('tInput') tInput: HTMLInputElement|null = null;
  @Input() user: IUser|null = null;

  constructor(public $user: UserService, private $fb: FirebaseService, private router: Router) { }

  public searchResultType: EResult|null = null;
  public searchResultView: IFriend|null= null;

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
    if ( event.code === 'Enter') {
      this.searchFriend((<HTMLInputElement>event.target)?.value)
    }
  }

  public afterClickSearch(element: HTMLInputElement): void {
    this.searchFriend(element.value);
  }

  public addAsFriend() {
      const rQfriend = this.user?.friends?.push(this.searchResultView?.id as string);
      console.log('addAsFriend',rQfriend,this.user?.friends,this.searchResultView)
      this.$fb.getDoc('user', this.user?.id as string).update({ friends: rQfriend })
      .then(()=>{ 
        (<HTMLInputElement>this.tInput).value = '';
        this.searchResultView = null;
        alert(`成功加入好友！`)});
  }

  public toChat(): void {
      this.router.navigateByUrl(`${EModule.User}/${UserPageMap.get(EUserPage.Chat)?.path}:${this.searchResultView?.id}`)
  }

  /**
   * @description 搜尋使用者id，如果是有註冊在userCenter裡的id，就將資料顯示在畫面上
   * @param input 
   */
  private searchFriend(id: string): void {
    const queryId = id.trim();
    if ( queryId !== '' && queryId.match(/\w/g) !== null) {
      const findInFriends = (this.user?.friends as string[]).find(id => id === queryId);
      let findInUserCenter: string|undefined;
      this.$fb.request('user').read()
      .then((ids: {key: string, value: IFriend}[]) => findInUserCenter = (ids.find(id =>id.key === queryId))?.key as string|undefined)
      .then(()=> {
        if ( findInUserCenter !== undefined ) {
          this.$fb.request('user').read(queryId).then((friend: IFriend) => {
            this.searchResultView = friend
          });
        }
        this.searchResultType = findInUserCenter !== undefined
                              ? findInFriends === undefined
                              ? EResult.Add
                              : EResult.InFriends 
                              : EResult.NoResult;
                              console.log('this.searchResultType',this.searchResultType)
  
    
      });
    }
    else {
      this.searchResultType = EResult.WrongInput;
    }
  }
}
