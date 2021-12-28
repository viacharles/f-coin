import { FirebaseService } from '../../../shared/services/firebase.service';
import { IBusinessCenter } from '../../../../../utility/interface/businessCenter.interface';
import { BusinessCenterService } from '@user/shared/services/business-center.service';
import { CoiningAction } from '@user/shared/models/coining.model';
import { UserService } from '@user/shared/services/user.service';
import { CoiningService } from './coining.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '@user/shared/models/user.model';

@Component({
  selector: 'app-coining',
  templateUrl: './coining.component.html',
  styleUrls: ['./coining.component.scss']
})
export class CoiningComponent implements OnInit {

  @Input() user: User|null = null;

  constructor(
    public $coining: CoiningService,
    private $fb: FirebaseService,
    public $business: BusinessCenterService,
    public $user: UserService ) { }

  public business: IBusinessCenter|null = null;
  public friendsNums = 0;
  public friends$ = this.$user.friends$;
  public isDiggingView = sessionStorage.getItem('id') === 'true' ? true : false;

  ngOnInit(): void {
   this.initial();
  }

  /**
   * @description 當下每秒鑄造f-coin數量
   * ：基本1顆，每一個好友在線加0.5顆
   */
  get currentIncomePerSec(): number {
    return 1 + this.friendsNums * .5;
  }

  /**
   * @description 開關挖礦：
   */
   public toggleMining(): void {
    if (!this.isDiggingView) {
      console.log('toggleMining-on', this.isDiggingView, this.business?.totalAmount, this.currentIncomePerSec)
      this.$coining
      .fireEvent({
        action: CoiningAction.MiningStart,
        uid: this.user?.id,
        lastStopDay: this.business?.lastStopDate.toDate(),
        totalAssets: this.business?.totalAmount,
        currentIncomePerSec: this.currentIncomePerSec
      })
      .then(() => {
        console.log('toggleMining-on-success');
        sessionStorage.setItem('id', 'true');
        this.isDiggingView = true;
      });
    } else {
      console.log('toggleMining-off', this.isDiggingView)
      this.$coining
      .fireEvent({
        action: CoiningAction.MiningEnd,
        uid: this.user?.id
      })
      .then(() => {
        console.log('toggleMining-off-success');
        sessionStorage.setItem('id', 'false');
        this.isDiggingView = false;
      });
    }
  }

  private initial(): void {
    this.$user.friends$.subscribe(friends => this.friendsNums = friends.length);
    this.$fb.request('businessCenter').read$(this.user?.id).subscribe((res: IBusinessCenter) => {
          this.business = res;
          this.isDiggingView = this.business.isDigging;
          console.log('initial-isDiggingView', this.isDiggingView);
          console.log('FetchBusinessStatus', this.business);
        });
  }
}
