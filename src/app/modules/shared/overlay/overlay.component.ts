import { Dialog } from '@shared/overlay/overlay.model';
import { Component, Injector, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';
import { IDialog } from '@utility/interface/overlay.interface';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  constructor(
    public $overlay: OverlayService,
    private injector: Injector,
  ) { }

  public dialogs: Dialog[] = [];

  ngOnInit(): void {
    this.$overlay.dialogQueue$.subscribe(dialogs => this.afterDialogsChanged(dialogs));
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

  public getDisplayStyle(location?: {x: number, y: number}): string { return location ? 'fixed' : ''; }

  public getTopDiff(y?: number): string { return y ? y + 'px' : 'unset'; }

  public getRightDiff(x?: number ): string {
    return x ? (window.innerWidth - x + 20) + 'px' : 'unset';
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
