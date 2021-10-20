import { Component, OnInit } from '@angular/core';
import { UserList } from '@business/coining/coining.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit{

  constructor() {}

  public userList = new UserList().userList;

  ngOnInit(): void {
  }

}
