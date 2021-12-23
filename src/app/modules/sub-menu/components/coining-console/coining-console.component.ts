import { CoiningAction, ICoiningEvent } from '@user/shared/models/business.model';
import { UserService } from '@user/shared/services/user.service';
import { CoiningService } from './coining.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@user/shared/models/user.model';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-coining-console',
  templateUrl: './coining-console.component.html',
  styleUrls: ['./coining-console.component.scss']
})
export class CoiningConsoleComponent implements OnInit {

  constructor(
    public $coining: CoiningService,
    public $user: UserService) { }

    public user: User|null = null;

  ngOnInit(): void {
    this.$user.user$.subscribe(user => this.user = user);
  }

  /**
   * @description 開關挖礦：
   */
   public toggleMining(): void {
    if (this.user?.isCoining) {
      this.$coining.fireEvent({action: CoiningAction.miningStart});
    } else {
      this.$coining.fireEvent({action: CoiningAction.miningEnd});
    }
  }


}
