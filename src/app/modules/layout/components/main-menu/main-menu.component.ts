import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.service';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @Input() pageName = '';

  constructor(private router: Router, private render: Renderer2, private $navigation: NavigationService) {  }

private currentPagePath = '';

  ngOnInit(): void {
    this.$navigation.currentPagePath$.subscribe(path => this.currentPagePath = path);
  }

  get EModule(): typeof Module {
    return Module;
  }

  get EPage(): typeof Page {
    return Page;
  }

  get isCoiningPage(): boolean {
    return this.pageName === getPageMap(Module.Business).get(Page.FCoin)?.name;
  }

  public isThisPage(module: Module, page: Page): boolean {
     return `/${module}/${page}` === this.currentPagePath;
  }

  public toFuncPage(module: Module, page: Page): void {
    this.router.navigateByUrl(`${module}/${page}`);
  }

}
