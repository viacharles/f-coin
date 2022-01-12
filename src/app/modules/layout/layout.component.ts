import { UserPageMap } from '@utility/map/router.map';
import { SocialPageMap } from './../../../utility/map/router.map';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';
import { UserService } from '@user/shared/services/user.service';
import { EModule, ESocialPage, EUserPage } from '@utility/enum/route.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    public $navigation: NavigationService,
    public $user: UserService,
    private $router: Router
  ) { }
  get Module(): typeof EModule {
    return EModule;
  }
  public module: EModule = this.$navigation.getModule() || EModule.User;

  ngOnInit(): void {
  }

  public moduleChanged(name: EModule): void {
    this.module = name;
    this.$navigation.setModule(name);
    switch (name) {
      case EModule.Social:
        this.$router.navigateByUrl(`${EModule.Social}/${SocialPageMap.get(ESocialPage.SharedWall)?.path}`);
        break;
      case EModule.User:
        this.$router.navigateByUrl(`${EModule.User}/${UserPageMap.get(EUserPage.Chat)?.path}`);
        break;
    }

  }
}
