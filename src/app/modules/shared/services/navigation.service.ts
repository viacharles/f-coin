import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Module, Page } from '@utility/enum/route.enum';
import { getPageMap } from '@utility/map/router.map';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  private pageName = new BehaviorSubject<string | undefined>(undefined);
  public pageName$ = this.pageName.asObservable().pipe(filter((name) => !!name));

  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationStart) {
    }

    if (event instanceof NavigationEnd) {
      this.onNavigationEnd(event);
    }
  }

  private onNavigationEnd(event: NavigationEnd): void {
    if (event.url === '/') {
      this.router.navigateByUrl(environment.defaultUrl);
    } else {
      const ModuleName = event.url.split('/')[1];
      const PageName = event.url.split('/')[2];
      this.pageName.next(getPageMap(ModuleName).get(PageName)?.name);
    }
  }
}
