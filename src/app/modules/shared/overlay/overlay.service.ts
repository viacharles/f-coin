import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor() {
    window.requestAnimationFrame(this.watchOverlay.bind(this));
  }

  public loadingQueue = new Set<string>();

  public isActivated = false;

  public startLoading(): string {
    const Id = new Date().toISOString();
    if (!this.loadingQueue.has(Id)) {
      this.loadingQueue.add(Id);
    }

    return Id;
  }

  public endLoading(id: string | null, activatedElement?: HTMLElement): void {
    if (this.loadingQueue.has(id as string)) {
      this.loadingQueue.delete(id as string);
    }
    activatedElement?.focus();
  }

  private watchOverlay() {
    this.isActivated = this.loadingQueue.size > 0;
    window.requestAnimationFrame(this.watchOverlay.bind(this));
  }

}
