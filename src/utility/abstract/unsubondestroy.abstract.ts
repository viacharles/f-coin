import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class UnSubOnDestroy implements OnDestroy {
  constructor() {}

  private destroy = new Subject<void>();

  protected onDestroy$ = this.destroy.asObservable();

  protected onDestroy(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.onDestroy();
  }
}


