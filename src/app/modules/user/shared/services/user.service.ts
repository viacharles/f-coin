import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private $firebase: FirebaseService
  ) {}

  private friends = new BehaviorSubject<Friend[] | null>(null);
  public friends$ = this.friends.asObservable().pipe(tap(_ => console.log(_)));

  public fetchFirendList() {
    this.$firebase.request('friends').read().then((friends: any[]) => this.friends.next(friends.map(friend => new Friend(friend))));
  }
}
