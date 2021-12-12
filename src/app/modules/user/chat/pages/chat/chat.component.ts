import { take, tap, map, switchMap, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { ActivatedRoute } from '@angular/router';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';

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

  public message = '';

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(({ id }) =>
          this.$user.user$.pipe(
            take(1),
            map((user) => ({ user, id }))
          )
        )
      )
      .subscribe(({ user, id }) => this.initial(user, id));
  }

  private initial({ uid }: any, friendId: string): void {
    this.$feature
      .fireEvent<IMessage[]>({
        action: ChatAction.FetchChatHistory,
        friendId,
        id: uid,
      })
      .then((_) => console.log(_));
  }
}
