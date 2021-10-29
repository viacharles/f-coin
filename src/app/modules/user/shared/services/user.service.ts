import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';
import { FirebaseService } from '@shared/services/firebase.service';
import {
  debounceTime,
  filter,
  map,
  scan,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private $firebase: FirebaseService) {
    this.$firebase
      .watch('user')
      .doc('n6KZ8iX44MMlbPgWtt5pzB7tb4D2')
      .onChanges$()
      .pipe(map((res: any) => res.friends))
      .subscribe((friends) => this.updateFriendsList(friends));
  }

  private friends = new BehaviorSubject<Friend | null>(null);
  public friends$: Observable<Friend[]> = this.friends.asObservable().pipe(
    scan((previous: Friend[], current: Friend | null) => {
      if (current instanceof Friend) {
        if (
          !previous.some((friend: any) => friend.id === current?.id) &&
          current.id
        ) {
          previous.push(current);
        }
      } else {
        previous = [];
      }
      return previous;
    }, []),
    debounceTime(300)
  );

  /**
   * @description 主動更新好友清單
   */
  public fetchFriendList(): void {
    this.$firebase
      .request('user')
      .read('n6KZ8iX44MMlbPgWtt5pzB7tb4D2')
      .then(({ friends }: { friends: any[] }) =>
        this.updateFriendsList(friends)
      );
  }

  private updateFriendsList(friends: any[]): void {
    console.log(`total ${friends.length} friends have updated.`);
    this.friends.next(null);
    friends.forEach((id) => {
      const User = new Friend(id, this.$firebase);
      User.initial().then(() => this.friends.next(User));
    });
  }
}
