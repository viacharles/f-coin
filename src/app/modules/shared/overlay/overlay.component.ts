import { Component } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
  constructor(private $overlay: OverlayService) {}
  get isLoading(): boolean {
    return this.$overlay.loadingQueue.size > 0;
  }
}
