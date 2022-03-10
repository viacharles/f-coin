import { Component, EventEmitter, Output } from '@angular/core';
import { IDialog } from '@utility/interface/overlay.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements IDialog {
  @Output() close = new EventEmitter<void>();
  public id: any;
  public params: any;
  public component: any;
  constructor() { }
}
