import { EModule } from "@utility/enum/route.enum";

/**
 * @description 頁面配置
 */
export interface IPage {
  path: string;
  icon?: string;
}

/**
 * @description 選單配置
 * @property icon 選單icon
 * @property isHide 是否隱藏功能項
 */
export interface IMenu {
  icon: string;
  isHide?: boolean
}
