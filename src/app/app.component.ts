import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { OverlayService } from '@shared/overlay/overlay.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { EIndividualPage } from '@utility/enum/route.enum';
import { IndividualPageQueue } from '@utility/map/router.map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, public $overlay: OverlayService) {}

  public isIndividualPage(): boolean {
    return IndividualPageQueue.has(
      this.router.url.split('/')[1] as EIndividualPage
    );
  }
}
