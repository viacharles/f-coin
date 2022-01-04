import { Component, OnInit } from '@angular/core';
import { OverlayService } from '@shared/overlay/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  constructor(private $overlay: OverlayService) { }
  public isLoading = false;

  ngOnInit(): void {
    window.requestAnimationFrame(this.setLoading.bind(this));
  }

  private setLoading() {
    this.isLoading = this.$overlay.loadingQueue.size > 0;
    window.requestAnimationFrame(this.setLoading.bind(this));
  }

}
