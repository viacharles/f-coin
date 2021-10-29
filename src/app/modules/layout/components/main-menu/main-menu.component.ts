import { Component, Input, OnInit } from '@angular/core';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @Input() pageName = '';

  constructor() {  }

  ngOnInit(): void {

  }

  get isCoiningPage(): boolean {
    return this.pageName === getPageMap(Module.Business).get(Page.FCoin)?.name;
  }

  public toChatRoomPage() {

  }

}
