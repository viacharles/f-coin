import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';

interface IFooterFunc {
  name: string;
  imgUrl: string;
  module: Module;
  pageUrl: Page;
}

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() pageName = '';
  public footerFuncs: IFooterFunc[] = [
    // {
    //   name: '主頁',
    //   imgUrl: ''
    // },
    {
      name: '聊天',
      imgUrl: '',
      module: Module.User,
      pageUrl: Page.Chat,
    },
    // {
    //   name: '貼文串',
    //   imgUrl: ''
    // },
    // {
    //   name: 'TODAY',
    //   imgUrl: ''
    // },
    {
      name: '挖礦',
      imgUrl: '',
      module: Module.Business,
      pageUrl: Page.FCoin,
    },
  ];

  ngOnInit(): void {}

  get isCoiningPage(): boolean {
    return this.pageName === getPageMap(Module.User).get(Page.FCoin)?.name;
  }

  public getClassImgUrl(index: number): string {
    return this.footerFuncs[index].imgUrl;
  }

  public toFuncPage(module: Module, page: Page): void {
    this.router.navigateByUrl(`${module}/${page}`);
  }
}
