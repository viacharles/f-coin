import { FirebaseService } from '@shared/services/firebase.service';
import { IBusinessCenter } from '@utility/interface/businessCenter.interface';
import { CoinInfo, CoiningAction as Action } from '@business/shared/models/coining.model';
import { UserService } from '@user/shared/services/user.service';
import { CoiningService } from './coining.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '@user/shared/models/user.model';
import { BusinessCenterService } from '@business/shared/services/business-center.service';
import { distinctUntilChanged, tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-coining',
  templateUrl: './coining.component.html',
  styleUrls: ['./coining.component.scss']
})
export class CoiningComponent implements OnInit {

  @Input() user: User | null = null;

  constructor(
    public $feature: CoiningService,
    public $user: UserService
  ) { }


  public friendsNums = 0;
  public friends$ = this.$user.friends$.pipe(
    map(friends => friends.filter(({ isLogin }) => isLogin)),
    distinctUntilChanged((previous, current) => previous.length !== current.length),
    tap(friends => this.friendsNums = friends.length)
  );
  public coinInfo: CoinInfo | undefined;


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


  private initial(): void {
    this.$feature.fireEvent<CoinInfo>({
      action: Action.FetchCoinInfo,
      uid: this.user?.id
    }).then(coinInfo => this.coinInfo = coinInfo);

  }
}
