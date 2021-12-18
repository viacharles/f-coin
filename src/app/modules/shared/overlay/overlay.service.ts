import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor() {}

  public loadingQueue = new Set<string>();

  get isActivated(): boolean {
    return this.loadingQueue.size > 0;
  }

  public startLoading(): string {
    const Id = new Date().toISOString();
    if (!this.loadingQueue.has(Id)) {
      setTimeout(() => this.loadingQueue.add(Id), 0);
    }
    return Id;
  }

  public endLoading(id: string, activatedElement?: HTMLElement): void {
    if (this.loadingQueue.has(id)) {
      this.loadingQueue.delete(id);
    }
    activatedElement?.focus();
  }
}
