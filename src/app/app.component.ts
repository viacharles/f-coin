import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Page } from '@utility/enum/route.enum';
import { IndividualPageQueue } from '@utility/map/router.map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  public isIndividualPage(): boolean {
    return IndividualPageQueue.has(this.router.url.split('/')[1] as Page);
  }
}
