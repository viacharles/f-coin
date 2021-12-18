import { take, tap, map, switchMap, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { ActivatedRoute } from '@angular/router';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { Friend } from '@user/shared/models/friend.model';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends UnSubOnDestroy implements OnInit {
  constructor(
    private $feature: ChatService,
    private $user: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public history: IMessage[] = [];
  public friend: Friend | null = null;

  ngOnInit(): void {
    combineLatest([this.$user.friends$, this.activatedRoute.params])
      .pipe(
        takeUntil(this.onDestroy$),
        map(([friends, { id }]) => ({ friends, id })),
        switchMap(({ friends, id }) =>
          this.$user.user$.pipe(
            take(1),
            map((user) => ({ friends, user, id }))
          )
        )
      )
      .subscribe(({ user, id, friends }) => this.initial(user, id, friends));
  }

  private initial({ uid }: any, friendId: string, friends: Friend[]): void {
    this.friend = friends.find(({ id }) => id === friendId) as Friend;
    this.$feature
      .fireEvent<IMessage[]>({
        action: ChatAction.FetchChatHistory,
        friendId,
        id: uid,
      })
      .then((history) => (this.history = history));
  }
}
