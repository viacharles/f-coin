import { IOverlay } from '@utility/interface/overlay.interface';
import { UnSubOnDestroy } from '@utility/abstract/unsubondestroy.abstract';
import { Injectable } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';
import { ESize } from '@utility/enum/common.enum';
import { DialogComponent } from '@shared/overlay/dialog/dialog.component';



@Injectable()
export abstract class AbstractDialog<T> extends UnSubOnDestroy {
  constructor(
    protected $overlay: OverlayService,
    protected dialog: DialogComponent
  ) {
    super();
  }

  get id(): string { return this.dialog.id; }
  get params(): IOverlay<T> { return this.dialog.params; }
  get callbacks() { return this.params?.callbacks; }
  get config() { return this.params?.config; }
  get options() { return this.params?.options; }
  get size(): typeof ESize { return ESize; }

  public cancel(parms?: any) {
    if (this.params?.callbacks?.cancel) {
      this.params?.callbacks?.cancel(parms);
    }
    this.$overlay.closeDialog(this.dialog);
  }

  public confirm(parms?: any) {
    if (this.params?.callbacks?.confirm) {
      this.params?.callbacks?.confirm(parms);
    }
    this.$overlay.closeDialog(this.dialog);
  }

  public close() {
    this.$overlay.closeDialog(this.dialog);
  }
}
