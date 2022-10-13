import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Directive, HostListener, Output } from '@angular/core';
import { IPosition } from '@utility/interface/common.interface';

@Directive({
  selector: '[appDragMove]'
})
export class DragMoveDirective implements OnInit {
  @Output() OnDragStart = new EventEmitter<IPosition>();
  @Output() OnDragMove = new EventEmitter<IPosition>();
  @Output() OnDragEnd = new EventEmitter<IPosition>();

  constructor(
    private eleRef: ElementRef
  ) { }

  private efficient = false;

  // @HostListener('dragstart', ['$event']) dragStart(event: DragEvent): void {
  //   this.OnDragStart.emit(this.calculateElementPosition(event));
  // }
  @HostListener('drag', ['$event']) drag(event: DragEvent): void {
    console.log(event)
    this.OnDragMove.emit(this.calculateElementPosition(event));
  }
  // @HostListener('dragend', ['$event']) dragEnd(event: DragEvent): void {
  //   this.OnDragEnd.emit(this.calculateElementPosition(event));
  // }

  ngOnInit(): void {
    console.log((this.eleRef.nativeElement as HTMLElement).getBoundingClientRect())
  }

  private calculateElementPosition({ offsetX, offsetY }: DragEvent): IPosition {
    const { x, y } = (this.eleRef.nativeElement as HTMLElement).getBoundingClientRect();
    // console.log(offsetX, offsetY)
    return {
      x: x + offsetX,
      y: y + offsetY,
      offsetX, offsetY
    }
  }
}
