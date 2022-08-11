import { IPosition } from './../../../utility/interface/common.interface';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';
import { ResizeObserver } from 'resize-observer';

import { EModule, ESocialPage, EUserPage } from '@utility/enum/route.enum';
import { IMessage } from '@utility/interface/messageCenter.interface';
import { WindowHelper } from '@utility/helper/window-helper';
import { UserPageMap, SocialPageMap } from '@utility/map/router.map';
import { ChatAction as Action } from '@user/shared/models/chat.model';

import { BaseComponent } from '@utility/base/base-component';
import { ChatService } from '@user/chat/chat.service';
import { WindowService } from '@shared/services/window.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends BaseComponent {
  @ViewChild('tSubmenu') submenu?: ElementRef;
  @ViewChild('tPage') page?: ElementRef;


  constructor(
    public $navigation: NavigationService,
    private $chat: ChatService,
    private $router: Router,
    private $window: WindowService,
    private renderer: Renderer2
  ) { super(); }

  get Module(): typeof EModule {
    return EModule;
  }
  public module: EModule = this.$navigation.getModule() || EModule.User;
  public messageHistory: IMessage[] = [];
  private subMenuObserver?: ResizeObserver;

  protected onInit(): void {
    this.$chat.messageHistory$.pipe(takeUntil(this.onDestroy$)).subscribe(history => this.messageHistory = history);
    this.$chat.fireEvent<IMessage[]>({ action: Action.CreateSocket, id: this.user.id });
  }

  protected afterViewInit(): void {
    if (!this.subMenuObserver) {
      this.subMenuObserver = WindowHelper.generateResizeObserver(({ contentRect: { width }, target }) => {
        switch (target) {
          case this.page?.nativeElement: this.$window.pageWidth = width; break;
          case this.submenu?.nativeElement: this.$window.submenuWidth = width; break;
        }
      });
      this.subMenuObserver.observe(this.submenu?.nativeElement);
      this.subMenuObserver.observe(this.page?.nativeElement);
    }
  }

  /**
   * @description 更新當前模組
   */
  public updateModule(module: EModule): void {
    this.module = module;
    this.$navigation.setModule(module);
  }

  /**
   * @description 點擊選單切換模組
   */
  public moduleChanged(module: EModule): void {
    this.updateModule(module);
    switch (module) {
      case EModule.Social:
        this.$router.navigateByUrl(`${EModule.Social}/${SocialPageMap.get(ESocialPage.SharedWall)?.path}`);
        break;
      case EModule.User:
        this.$router.navigateByUrl(`${EModule.User}/${UserPageMap.get(EUserPage.Chat)?.path}`);
        break;
    }
  }

  public resizeSubMenu(subMenu: HTMLElement, page: HTMLElement, { offsetX }: IPosition): void {
    this.renderer.setStyle(subMenu, 'width', `${subMenu.clientWidth + (offsetX || 0)}px`);
    this.renderer.setStyle(page, 'width', `calc(100% - ${subMenu.clientWidth + (offsetX || 0)}px)`);
    this.renderer.removeClass(page, 'w-100');
  }
}
