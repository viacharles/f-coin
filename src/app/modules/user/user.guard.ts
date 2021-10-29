import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '@user/shared/services/user.service';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserGuard extends UnSubOnDestroy implements CanActivate {
  constructor(private $user: UserService) {
    super();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.$user.friends$
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((friends) => resolve(true));
    });
  }
}
