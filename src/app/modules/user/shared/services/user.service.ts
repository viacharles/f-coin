import { Injectable} from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { map, switchMap} from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private $firebase: FirebaseService, private $auth: AuthService) {
    if (this.$auth.isAuth) {
      this.$firebase
      .watch('user')
      .doc(sessionStorage.getItem('id') as string)
      .onChanges$()
      .pipe(
        map((res: any) => res.friends),
        // tap((ids) => {
        //   ids.forEach((id: any) => {
        //     this.$firebase.request('user').update({ isLogin: false }, id);
        //   });
        // }),
        switchMap((ids: any[]) =>
          forkJoin(ids.map((id) => this.$firebase.request('user').read$(id)))
        )
      )
      .subscribe((friends) => this.updateFriendsList(friends));
    }
  }

  private friends = new BehaviorSubject<Friend[]>([]);
  public friends$: Observable<Friend[]> = this.friends.asObservable();

  /**
   * @description 主動更新好友清單
   */
  // public fetchFriendList(): void {
  //   this.$firebase
  //     .request('user')
  //     .read('n6KZ8iX44MMlbPgWtt5pzB7tb4D2')
  //     .then(({ friends }: { friends: any[] }) =>
  //       this.updateFriendsList(friends)
  //     );
  // }

  private updateFriendsList(friends: any[]): void {
    console.log(`total ${friends.length} friends have updated.`);
    this.friends.next(friends.map((friend) => new Friend(friend)));
  }
}
