import { take, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction } from '@user/shared/models/chat.model';
import { UserService } from '@user/shared/services/user.service';
import { IMessage } from '@utility/interface/messageCenter.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private $feature: ChatService, private $user: UserService) {}

  public message = '';

  ngOnInit(): void {
    this.$user.user$.pipe(take(1)).subscribe((user) => this.initial(user));
  }

  private initial({ uid }: any): void {
    this.$feature
      .fireEvent<IMessage[]>({
        action: ChatAction.FetchChatHistory,
        friendId: 'mXofRWAtAIyRPDpemoJz',
        id: uid,
      })
      .then((_) => console.log(_));
  }
}
