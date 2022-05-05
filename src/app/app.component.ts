import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayService } from '@shared/overlay/overlay.service';
import { UserService } from '@user/shared/services/user.service';
import { EIndividualPage } from '@utility/enum/route.enum';
import { IndividualPageQueue } from '@utility/map/router.map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    public $user: UserService,
    public $overlay: OverlayService,
  ) { }
  ngOnInit(): void {
  }
  public isIndividualPage(): boolean {
    return IndividualPageQueue.has(
      this.router.url.split('/')[1] as EIndividualPage
    );
  }
}
