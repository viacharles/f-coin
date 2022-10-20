import { IPosition } from '@utility/interface/common.interface';
import { Dialog } from '@shared/overlay/overlay.model';
import { Component, Injector, OnInit, Renderer2, ElementRef, HostListener, ViewChild } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';
import { IDialog } from '@utility/interface/overlay.interface';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  @ViewChild('tDialogContainer') tDialogContainer?: ElementRef;

  constructor(
    public $overlay: OverlayService,
    private injector: Injector,
    private renderer: Renderer2
  ) { }

  public dialogs: Dialog[] = [];

  ngOnInit(): void {
    this.$overlay.dialogQueue$.subscribe(dialogs => this.afterDialogsChanged(dialogs));
  }

  /** 被點擊的 dialog 會有 focus 樣式，點在 dialog 外面則取消 focus 樣式 */
  @HostListener('click', ['$event']) screenClick(event: Event) {
    const ElementInFocus = event.target as HTMLElement;
    const ElementPerform = this.tDialogContainer?.nativeElement as HTMLElement;
    this.renderer.addClass(ElementPerform, ElementPerform.contains(ElementInFocus) ? 'focus' : 'unFocus');
    this.renderer.removeClass(ElementPerform, ElementPerform.contains(ElementInFocus) ? 'unFocus' : 'focus');
  }

  public setDialogPosition(event: IPosition, target: HTMLElement): void {
    this.renderer.removeStyle(target, 'left');
    this.renderer.removeStyle(target, 'right');
    this.renderer.setStyle(target, 'left', `${event.x}px`);
    this.renderer.setStyle(target, 'top', `${event.y}px`);
  }

  /**  */
  public getPositionOffset(offset?: number, reverse = false): number | null {
    return typeof offset === 'number' ? !reverse ?
      offset >= 0 ? offset : null :
      offset < 0 ? Math.abs(offset) : null : null;
  }

  /**
   * @description 觸發彈窗背景點擊事件
   */
  public onDialogBackdropClick({ dialog, params }: Dialog, event: MouseEvent, container: HTMLElement): void {
    if (!container.contains(event.target as HTMLElement)) {
      if (params.callbacks?.backdrop) {
        params.callbacks.backdrop(dialog);
      }
      if (params.options?.backdropClose) {
        this.$overlay.closeDialog(dialog);
      }
    }
  }

  public test() {
    console.log('in')
  }

  /**
   * @description 更新彈窗
   */
  private afterDialogsChanged(dialogs: Set<IDialog>): void {
    this.dialogs = this.dialogs
      .map(dialog => Array.from(dialogs.values()).some(({ id }) => dialog.id === id) ? dialog : null)
      .filter(dialog => !!dialog) as Dialog[];
    dialogs.forEach(
      dialog => {
        if (!this.dialogs.some(({ id }) => dialog.id === id)) {
          this.dialogs.push(new Dialog(dialog, this.injector));
        }
      }
    );
  }
}
