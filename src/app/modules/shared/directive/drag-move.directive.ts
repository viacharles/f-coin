import { ThrowStmt } from '@angular/compiler';
import { ElementRef, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
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
  private isDragging = false;

  constructor(
    private eleRef: ElementRef,
  ) { }

  private offsetPosition?: IPosition;

  @HostListener('pointerdown', ['$event']) onClick(event: PointerEvent): void {
    if (event.button === 0 
      && (event.target as HTMLElement)?.className.includes('dialog__container')
      ) {
      this.isDragging = true;
      this.eleRef.nativeElement.setPointerCapture(event.pointerId); 
      this.offsetPosition = {
        x: event.offsetX,
        y: event.offsetY,
      }
    }
  }

  @HostListener('pointerup', ['$event']) onMouseUp(event: PointerEvent): void {
    if (this.isDragging === true) {
      this.OnDragMove.emit(this.calculateElementPosition(event));
      this.isDragging = false;
      this.eleRef.nativeElement.releasePointerCapture(event.pointerId);
    }
  }

  @HostListener('pointermove', ['$event']) onMouseMove(event: PointerEvent): void {
    if (this.isDragging === true && (event.clientX !== 0 || event.clientY !== 0)) {
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
