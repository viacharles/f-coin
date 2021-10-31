import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

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

  private defaultPagePath = `${Module.User}/${Page.Chat}`;

  private pageName = new Subject<string>();
  public pageName$ = this.pageName.asObservable();

  private currentPagePath = new BehaviorSubject<string>(this.defaultPagePath);
  public currentPagePath$ = this.currentPagePath.asObservable();

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
    this.currentPagePath.next(event.url);
  }
}


