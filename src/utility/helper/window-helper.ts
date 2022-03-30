import { ResizeObserverEntry } from 'resize-observer/lib/ResizeObserverEntry';
import { ResizeObserver } from 'resize-observer';

export class WindowHelper {
  /**
   * @description 生成resize觀察者
   * @param callback 目標大小改動時要觸發的callback function
   */
  static generateResizeObserver = (callback: (entry: ResizeObserverEntry) => void): ResizeObserver =>
    new ResizeObserver((entrys: ResizeObserverEntry[]) => entrys.forEach(entry => callback(entry))
    )
}
