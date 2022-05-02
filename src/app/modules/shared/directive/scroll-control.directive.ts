
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';



@Directive({
  selector: '[appScrollControl]'
})
export class ScrollControlDirective {
  @Input() debounceTime = .4;
  @Output() scrollEnd = new EventEmitter<void>();
  @Output() scrolling = new EventEmitter<Event>();

  constructor() {
  }

  private scrollEndTimer?: any;

  @HostListener('scroll', ['$event']) scroll(event: Event): void {
    this.isScrolling(event);
    this.isScrollEnd();
  }

  private isScrollEnd(): void {
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
    }
    this.scrollEndTimer = setTimeout(() => this.scrollEnd.emit(), this.debounceTime * 1000);
  }

  private isScrolling(event: Event): void {
    this.scrolling.emit(event);
  }

}