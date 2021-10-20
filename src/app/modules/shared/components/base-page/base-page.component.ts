import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export abstract class BasePageComponent implements OnInit {

  constructor() { }

  /**
   * 頁面標題
   */
  protected pageTitle = '';

  /**
   * 網址 domain
   */
  protected domain = 'coining';

  ngOnInit(): void {
  }
}
