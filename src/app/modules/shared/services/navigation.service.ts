import { Injectable } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { getPageMap } from '@utility/map/router.map';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        )
      )
      .subscribe((event) => this.handleRouterEvent(event));
  }

  private pageName = new Subject<string>();
  /**
   * @description 頁面標題名稱
   */
  public pageName$ = this.pageName.asObservable();

  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationStart) {
    }

    if (event instanceof NavigationEnd) {
      this.onNavigationEnd(event);
    }
  }

  private onNavigationEnd(event: NavigationEnd): void {
    const ModuleName = event.url.split('/')[1];
    const PageName = event.url.split('/')[2];
    this.pageName.next(getPageMap(ModuleName).get(PageName)?.name);
  }
}


