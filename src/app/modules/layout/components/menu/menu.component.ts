import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EModule } from '@utility/enum/route.enum';
import { MenuMap } from '@utility/map/router.map';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() moduleChanged = new EventEmitter<EModule>();
  @Input() module: EModule = EModule.User;
  constructor(
    public $auth: AuthService
  ) {}
  public readonly Menu = MenuMap;
}
