import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';
import { EModule } from '@utility/enum/route.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(public $navigation: NavigationService) {}
  get Module(): typeof EModule {
    return EModule;
  }
  public module: EModule = EModule.User;

  ngOnInit(): void {}
}
