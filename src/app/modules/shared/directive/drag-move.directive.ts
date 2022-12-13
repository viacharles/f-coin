import { ThrowStmt } from '@angular/compiler';
import { ElementRef, EventEmitter, ViewChild, Renderer2, Input } from '@angular/core';
import { Directive, HostListener, Output } from '@angular/core';
import { IPosition } from '@utility/interface/common.interface';

@Directive({
  selector: '[appDragMove]'
})
export class DragMoveDirective {
  @Input() targetElem!: HTMLDivElement;
  @Output() OnDragMove = new EventEmitter<IPosition>();

  get elementRect(): DOMRect {
    return (this.eleRef.nativeElement as HTMLElement).getBoundingClientRect();
  }

  private isDragging = false;
  private offsetPosition?: IPosition;

  constructor(
    private eleRef: ElementRef,
  ) { }

  @HostListener('pointerdown', ['$event']) onClick(event: PointerEvent): void {
    if (event.button === 0 &&  event.target === this.targetElem) {
      this.isDragging = true;
      this.eleRef.nativeElement.setPointerCapture(event.pointerId);
      this.offsetPosition = {
        x: event.offsetX,
        y: event.offsetY,
      }
    }
  }

  @HostListener('pointerup', ['$event']) onMouseUp(event: PointerEvent): void {
    if (this.isDragging) {
      this.OnDragMove.emit(this.calculateElementPosition(event));
      this.isDragging = false;
      this.eleRef.nativeElement.releasePointerCapture(event.pointerId);
    }
  }

  @HostListener('pointermove', ['$event']) onMouseMove(event: PointerEvent): void {
    if (this.isDragging && (event.clientX !== 0 || event.clientY !== 0)) {
          this.OnDragMove.emit(this.calculateElementPosition(event));
    }
  }

  private calculateElementPosition({ offsetX, offsetY }: PointerEvent): IPosition {
    const { x, y } = this.elementRect;
    return {
      x: x + offsetX - (this.offsetPosition?.x || 0),
      y: y + offsetY - (this.offsetPosition?.y || 0),
      offsetX, offsetY
    }
  }
}
