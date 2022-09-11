import { Injectable } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { EModule } from '@utility/enum/route.enum';
import { filter } from 'rxjs/operators';
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

  public setModule(value: EModule): void {
    sessionStorage.setItem('module', value.toString());
  }
  public getModule(): EModule|null {
    const module = sessionStorage.getItem('module');
    switch (module) {
      case 'user':
        return EModule.User;
      case 'social':
        return EModule.Social;
      case 'friend':
        return EModule.Friend;
      case 'business':
        return EModule.Business;
      default:
        return null;
    }
  }

  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationStart) {
    }

    if (event instanceof NavigationEnd) {
      this.onNavigationEnd(event);
    }
  }

  private onNavigationEnd(event: NavigationEnd): void {
    if (event.url === '/') {
      this.router.navigateByUrl(environment.defaultUrl as string);
    }
  }
}