import { ElementRef, EventEmitter } from '@angular/core';
import { Directive, HostListener, Output } from '@angular/core';
import { IPosition } from '@utility/interface/common.interface';

@Directive({
  selector: '[appDragMove]'
})
export class DragMoveDirective {
  @Output() OnDragStart = new EventEmitter<IPosition>();
  @Output() OnDragMove = new EventEmitter<IPosition>();
  @Output() OnDragEnd = new EventEmitter<IPosition>();

  get elementRect(): DOMRect {
    return (this.eleRef.nativeElement as HTMLElement).getBoundingClientRect();
  }

  constructor(
    private eleRef: ElementRef
  ) { }

  private offsetPosition?: IPosition;

  @HostListener('mousedown', ['$event']) onClick({ x, y }: MouseEvent): void {
    this.offsetPosition = {
      x: x - this.elementRect.x,
      y: y - this.elementRect.y
    };
  }

  @HostListener('dragstart', ['$event']) dragStart(event: DragEvent): void {
    this.OnDragStart.emit(this.calculateElementPosition(event));
  }

  @HostListener('drag', ['$event']) drag(event: DragEvent): void {
    if (event.clientX !== 0 || event.clientY !== 0) {
      this.OnDragMove.emit(this.calculateElementPosition(event));
    }
  }

  @HostListener('dragend', ['$event']) dragEnd(event: DragEvent): void {
    this.OnDragEnd.emit(this.calculateElementPosition(event));
  }

  private calculateElementPosition({ offsetX, offsetY }: DragEvent): IPosition {
    const { x, y } = this.elementRect;
    return {
      x: x + offsetX - (this.offsetPosition?.x || 0),
      y: y + offsetY - (this.offsetPosition?.y || 0),
      offsetX, offsetY
    }
  }
}
