import {
  UserPageMap,
  SocialPageMap
} from '@utility/map/router.map';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';
import { UserService } from '@user/shared/services/user.service';
import { EModule, ESocialPage, EUserPage } from '@utility/enum/route.enum';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(
    public $navigation: NavigationService,
    public $user: UserService,
    private $router: Router
  ) { }

  get Module(): typeof EModule {
    return EModule;
  }
  public module: EModule = this.$navigation.getModule() || EModule.User;

  /**
   * @description 更新當前模組
   */
  public updateModule(module: EModule) {
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
}
