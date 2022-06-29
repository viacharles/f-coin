import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { EventEmitter, OnInit } from '@angular/core';
import { Directive, HostListener, Output } from '@angular/core';
import { interval, Subject } from 'rxjs';

import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { IDragMove, IMove } from '@utility/interface/common.interface';

@Directive({
  selector: '[appDragMove]'
})
export class DragMoveDirective extends UnSubOnDestroy implements OnInit {
  @Output() dragStartMove = new EventEmitter<IMove>();
  /**
   * @description drag移動中的資料
   */
  @Output() draggingMove = new EventEmitter<IMove>();
  @Output() dragEndMove = new EventEmitter<IMove>();
  /**
   * @description drag事件集合
   */
  @Output() dragCase = new EventEmitter<IDragMove>();

  private dragMoveSubject = new Subject<IMove>();
  private dragMoveObserver = this.dragMoveSubject.asObservable();
  constructor() { super(); }

  private dragInfo: IDragMove = {
    start: {x: 0, y: 0, clientX: 0, clientY: 0},
    move: {x: 0, y: 0, clientX: 0, clientY: 0},
    end: {x: 0, y: 0, clientX: 0, clientY: 0},
  };

  ngOnInit(): void {
    this.dragMoveObserver
    .pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    )
    .subscribe(move => {
      console.log('NEXT', move)
      this.draggingMove.emit(move);
    });
  }

  @HostListener('dragstart', ['$event']) dragStart(event: DragEvent): void {
    this.dragInfo.start = this.emitAndSetMoveInfo(event, this.dragStartMove);
  }
  @HostListener('drag', ['$event']) drag(event: DragEvent): void {
    this.dragInfo.move = this.emitAndSetMoveInfo(event, this.draggingMove);
  }
  @HostListener('dragend', ['$event']) dragEnd(event: DragEvent): void {
    this.dragInfo.end = this.emitAndSetMoveInfo(event, this.dragEndMove);
  }

  /**
   * @description 設定事件的傳值
   * @param event 事件原始資訊
   * @param emitType 負責發送值的變數
   * @param dragInfoAttr this.dragInfo承接值的屬性
   */
  private emitAndSetMoveInfo(event: DragEvent, emitType: EventEmitter<any>): IMove {
    const Move: IMove = {x: event.x, y: event.y, clientX: event.clientX, clientY: event.clientY};
    emitType.emit(Move);
    this.dragMoveSubject.next(Move);
    return Move;
  }
}
