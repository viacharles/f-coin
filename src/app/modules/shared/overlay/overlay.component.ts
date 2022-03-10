import { Dialog } from '@shared/overlay/overlay.model';
import { Component, Injector, OnInit } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  constructor(
    public $overlay: OverlayService,
    private injector: Injector
  ) { }

  public dialogs: Dialog[] = [];

  ngOnInit(): void {
    this.$overlay.dialogQueue$.subscribe(
      dialogs => this.dialogs = Array.from(dialogs.values())
        .map(dialog => new Dialog(dialog, this.injector))
    );
  }

}
