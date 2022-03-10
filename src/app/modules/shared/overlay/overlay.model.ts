import { Injector } from "@angular/core";
import { IDialog, IOverlay } from "@utility/interface/overlay.interface";
import { DialogComponent } from "@shared/overlay/dialog/dialog.component";

export class Dialog<T = any> implements IDialog<T> {
  public component: any;
  public id: string;
  public params: IOverlay<T>;
  public injector: Injector;

  constructor(
    dialog: IDialog<any>,
    injector: Injector,
  ) {
    this.id = dialog.id;
    this.component = dialog.component;
    this.params = dialog.params;
    this.injector = Injector.create({
      providers: [{
        provide: DialogComponent,
        useValue: dialog
      }],
      parent: injector
    })
  }

}
