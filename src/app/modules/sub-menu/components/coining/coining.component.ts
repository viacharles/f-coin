import { OverlayService } from '@shared/overlay/overlay.service';
import { ICoinInfo } from '@utility/interface/businessCenter.interface';
import { CoinInfo, CoiningAction as Action } from '@business/shared/models/coining.model';
import { UserService } from '@user/shared/services/user.service';
import { CoiningService } from './coining.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '@user/shared/models/user.model';
import { map, take } from 'rxjs/operators';
import { IFriend } from '@utility/interface/user.interface';

@Component({
  selector: 'app-coining',
  templateUrl: './coining.component.html',
  styleUrls: ['./coining.component.scss']
})
export class CoiningComponent implements OnInit {

  @Input() user: User | null = null;

  constructor(
    public $user: UserService,
    private $feature: CoiningService,
    private $overlay: OverlayService
  ) { }

  public assets$ = this.$feature.assets$.pipe(map(assets => `${assets}`));
  public coinInfo: CoinInfo | undefined;
  private friends: IFriend[] = [];

  get onlineFriends(): IFriend[] { return this.friends.filter(({ isLogin }) => isLogin); }

  ngOnInit(): void {
    this.initial();
  }

  /**
   * @description 當下每秒鑄造f-coin數量
   * ：基本1顆，每一個好友在線加0.5顆
   */
  get currentIncomePerSec(): number {
    return 1 + this.onlineFriends.length * .5;
  }

  public digging(): void {
    if (!(this.coinInfo as ICoinInfo).isDigging ) {
      if ( this.isNextDayAfterStop()) {
        this.$feature.fireEvent({
          action: Action.StartDigging,
          id: this.user?.id
        }).then(() => {
          (this.coinInfo as ICoinInfo).isDigging = true;
        });
      } else {
        const stopDay = this.coinInfo?.lastStopDate?.toDate() as Date;
        alert(`下次挖礦時間${stopDay.getFullYear()}/${stopDay.getMonth() + 1}/${stopDay.getDate() + 1}`)
      }
    } else {
      this.$feature.fireEvent({
        action: Action.EndDigging,
        id: this.user?.id
      }).then(() => {
        (this.coinInfo as ICoinInfo).isDigging = false;
      });
    }
  }

  private initial(): void {
    const loaderId =this.$overlay.startLoading();
    this.$user.friends$.pipe(take(1)).subscribe(friends => this.friends = friends);
    this.$feature.fireEvent<CoinInfo>({
      action: Action.FetchCoinInfo,
      id: this.user?.id
    }).then(coinInfo => {
      this.coinInfo = coinInfo;
      if (coinInfo.isDigging) {
        this.$feature.fireEvent({
          action: Action.StartDigging,
          id: this.user?.id
        });
      }
      this.$overlay.endLoading(loaderId);
    });
  }

  private isNextDayAfterStop(): boolean {
    const today = new Date();
    const stopDay = (this.coinInfo?.lastStopDate?.toDate() as Date);
    return today >= new Date(stopDay.setDate(stopDay.getDate()+1));
  }
}
