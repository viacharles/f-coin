import { LoggerService } from '@shared/services/logger.service';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IDialog, ILoading, IOverlay } from '@utility/interface/overlay.interface';
import { map, reduce, scan, tap, filter } from 'rxjs/operators';
import { EAction, ESize } from '@utility/enum/common.enum';

interface DialogEvent {
  action: EAction.Add | EAction.Delete | EAction.Clear | EAction.Initial;
  dialog?: IDialog
}
@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(
    private $logger: LoggerService
  ) {
    this.loadingQueue$.subscribe();
  }

  private loadingQueue: Subject<ILoading> = new Subject();
  public loadingQueue$: Observable<Set<string>> = this.loadingQueue.asObservable().pipe(
    scan((queue: Set<string>, current: ILoading) => this.resolveLoadingAction(queue, current), new Set()),
    tap(queue => this.loadingSize = queue.size)
  );
  public loadingSize = 0;

  private dialogEvent: BehaviorSubject<any> = new BehaviorSubject(null);
  public dialogQueue$ = this.dialogEvent.asObservable().pipe(
    filter(event => !!event),
    scan((dialogs: Set<IDialog>, dialog: DialogEvent) => this.resolveDialogAction(dialogs, dialog), new Set()),
    tap(dialogs => this.dialogSize = dialogs.size)
  );
  public dialogSize = 0;

  /**
   * @param backdrop set false to hide backdrop overlay
   * @param  backdropClose set true to enable click backdrop close
   * @param isAside set true to enable aside dialog
   * @default backdrop true
   * @default backdropClose false
   * @default isAside false
   */
  public toggleDialog<T>(component: any, {
    config,
    callbacks = {
      confirm: () => { },
      cancel: () => { },
      backdrop: () => { }
    },
    size = ESize.Middle,
    options
  }: IOverlay<T>) {
    options = { ...{ backdrop: true, backdropClose: false, isAside: false }, ...options };
    this.dialogEvent.next({
      action: EAction.Add,
      dialog: {
        component,
        id: new Date().toISOString(),
        params: { config, callbacks, size, options }
      }
    });
  }

  public closeDialog(dialog: IDialog) {
    this.dialogEvent.next({ action: EAction.Delete, dialog });
  }

  public startLoading(): string {
    const Config: ILoading = {
      id: new Date().toISOString(),
      action: EAction.Add
    }
    this.loadingQueue.next(Config);
    return Config.id;
  }

  public endLoading(id: string, activatedElement?: HTMLElement): void {
    this.loadingQueue.next({ id, action: EAction.Delete });
    activatedElement?.focus();
  }

  public forceEndLoading() {
    this.loadingQueue.next({ id: '', action: EAction.Clear });
  }

  private resolveLoadingAction(queue: Set<string>, { id, action }: ILoading): Set<string> {
    switch (action) {
      case EAction.Add:
        if (!queue.has(id)) { queue.add(id); }
        break;
      case EAction.Delete:
        if (queue.has(id)) { queue.delete(id); }
        break;
      case EAction.Clear:
        queue.clear();
        break;
    }
    return queue;
  }

  private resolveDialogAction(dialogs: Set<IDialog>, { action, dialog }: DialogEvent) {
    const Dialog = dialog as IDialog;
    switch (action) {
      case EAction.Add:
        if (!dialogs.has(Dialog)) {
          dialogs.add(Dialog);
        } else {
          this.$logger.errorMessage(`Dialog has already exist`, Dialog.id, 'Overlay');
        }
        break;
      case EAction.Delete:
        if (dialogs.has(Dialog)) {
          dialogs.delete(Dialog);
        } else {
          this.$logger.errorMessage(`Dialog not exist`, Dialog.id, 'Overlay');
        }
        break;
      case EAction.Clear: dialogs.clear(); break;
    }
    return dialogs;
  }

}
