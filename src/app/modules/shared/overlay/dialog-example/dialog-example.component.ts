import { Component, OnInit } from '@angular/core';
import { AbstractDialog } from '@utility/abstract/abstract-dialog';
import { IDialog } from '@utility/interface/overlay.interface';
import { DialogComponent } from '../dialog/dialog.component';
import { OverlayService } from '../overlay.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent extends AbstractDialog<any> implements OnInit {

  constructor($overlay: OverlayService, dialog: DialogComponent) {
    super($overlay, dialog);
  }

  ngOnInit(): void {
    console.log(this.id, this.config)
  }

}
