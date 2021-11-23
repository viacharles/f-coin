import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '@utility/enum/route.enum';
import { getPageMap, IndividualPageQueue } from '@utility/map/router.map';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  @Input() pageName = '';

  constructor(
    public router: Router,
    public $auth: AuthService
  ) {
    console.log('MainMenu', this.router.url)
  }

  get module(): typeof Module {
    return Module;
  }

  public businessMenu = getPageMap(Module.Business);
  public userMenu = getPageMap(Module.User);
  public individulPageMenu = IndividualPageQueue;
}
