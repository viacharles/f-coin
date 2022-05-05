import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  /**
   * @description 子選單寬度
   */
  public submenuWidth = 0;

  /**
   * @description 功能頁面寬度
   */
  public pageWidth = 0;
}
