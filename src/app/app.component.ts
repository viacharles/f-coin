import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FirebaseService } from '@shared/services/firebase.service';
import { UserActivityMockService } from '@shared/services/user-activity-mock.service';
import { UserService } from '@user/shared/services/user.service';
import { Page } from '@utility/enum/route.enum';
import { IndividualPageQueue } from '@utility/map/router.map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private $firebase: FirebaseService) {}

  ngOnInit(): void {}

  public isIndividualPage(): boolean {
    return IndividualPageQueue.has(this.router.url.split('/')[1] as Page);
  }
}
