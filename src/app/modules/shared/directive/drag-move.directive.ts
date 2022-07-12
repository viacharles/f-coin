import { EventEmitter } from '@angular/core';
import { Directive, HostListener, Output } from '@angular/core';
import { IPosition } from '@utility/interface/common.interface';

@Directive({
  selector: '[appDragMove]'
})
export class DragMoveDirective {
  @Output() OnDragStart = new EventEmitter<IPosition>();
  @Output() OnDragMove = new EventEmitter<IPosition>();
  @Output() OnDragEnd = new EventEmitter<IPosition>();

  constructor() { }

  @HostListener('dragstart', ['$event']) dragStart({ clientX: x, clientY: y }: DragEvent): void {
    this.OnDragStart.emit({ x, y });
  }
  @HostListener('drag', ['$event']) drag({ clientX: x, clientY: y, offsetX, offsetY }: DragEvent): void {
    if (x !== 0 && y !== 0) {
      this.OnDragMove.emit({ x, y, offsetX, offsetY });
    }
  }
  @HostListener('dragend', ['$event']) dragEnd({ clientX: x, clientY: y, offsetX, offsetY }: DragEvent): void {
    this.OnDragEnd.emit({ offsetX, offsetY, x, y });
  }

}
