import { Component, OnInit } from '@angular/core';
import { ChatService } from '@user/chat/chat.service';
import { ChatAction } from '@user/shared/models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private $feature: ChatService) {}

  public message = '';

  ngOnInit(): void {
    this.$feature
      .fireEvent<any>({
        action: ChatAction.FetchChatHistory,
        id: '0MSN5yaaApHsxg9uUC14',
      })
      .then((_) => console.log(_.message));
  }
}
