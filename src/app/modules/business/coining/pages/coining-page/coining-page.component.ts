import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coining-page',
  templateUrl: './coining-page.component.html',
  styleUrls: ['./coining-page.component.scss'],
})
export class CoiningPageComponent implements OnInit {
  constructor() {
  }

  // === 頁面資料 ===
  /**
   * 挖礦狀態
   */
  public status = '';
  /**
   * 目前上線人數
   */
  public peopleOnlineNumber: number | null = null;
  /**
   * 目前績效(顆/秒)
   */
  public coiningPerSec: number | null = null;
  /**
   * 按鈕文字
   */
  public buttonText = '';

  ngOnInit(): void {
  }

  public coiningSwitch(): void {
    this.buttonText === '啟動'
    ? this.buttonText = '停止'
    : this.buttonText = '啟動';
  }
}
