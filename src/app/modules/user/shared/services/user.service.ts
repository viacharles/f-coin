import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { map, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { OverlayService } from '@shared/overlay/overlay.service';

/**
 * friend list
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private $firebase: FirebaseService, private $auth: AuthService) {}

  private friends = new BehaviorSubject<Friend[]>([]);
  public friends$: Observable<Friend[]> = this.friends.asObservable();

  /**
   * @description 主動更新好友清單
   */
  public fetchFriendList(): void {
    console.log('fetch Friend List')
    this.$firebase
      .request('user')
      .read(sessionStorage.getItem('id') as string)
      .then(({ friends }: { friends: any[] }) => {
        //   friends.forEach((id: any) => {
        //     this.$firebase.request('user').update({ isLogin: false }, id);
        //   });
        forkJoin(
          friends.map((id) => this.$firebase.request('user').read$(id))
        ).subscribe((profiles: any) => this.updateFriendsList(profiles));
      });
  }

  private updateFriendsList(friends: any[]): void {
    console.log(`total ${friends.length} friends have updated.`);
    this.friends.next(friends.map((friend) => new Friend(friend)));
  }
}
