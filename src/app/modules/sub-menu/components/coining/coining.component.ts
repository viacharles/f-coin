import { CoinInfo, CoiningAction as Action } from '@business/shared/models/coining.model';
import { UserService } from '@user/shared/services/user.service';
import { CoiningService } from './coining.service';
import { Component,Input, OnInit } from '@angular/core';
import { User } from '@user/shared/models/user.model';
import { distinctUntilChanged, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Friend } from '@user/shared/models/friend.model';


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
  ) { }

  public friendsNums = 0;
  public assets$ = this.$feature.assets$.pipe(map(assets => `${assets}`));
  private friends = new Subject<Friend[]>();
  public friends$ = this.friends.asObservable();
  // public friends$ = this.$user.friends$.pipe(
  //   map(friends => friends.filter(({ isLogin }) => isLogin)),
  //   tap(friends => console.log('friends', friends)),
  //   distinctUntilChanged((previous, current) => previous.length !== current.length),
  //   tap(friends => this.friendsNums = friends.length)
  // );
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

  public digging(event: Event): void {
    if ((event.target as HTMLInputElement).checked && this.isNextDayAfterStop()){  
      this.$feature.fireEvent({
        action: (event.target as HTMLInputElement).checked ? Action.StartDigging : Action.EndDigging,
        id: this.user?.id
      }).then(() => this.coinInfo?.updateInfo({ isDigging: (event.target as HTMLInputElement).checked }));
    } else {
      //TODO: 以pop的形式顯示
      const stopDay = this.coinInfo?.lastStopDate?.toDate() as Date;
      alert(`下次挖礦時間${stopDay.getFullYear()}/${stopDay.getMonth()+1}/${stopDay.getDate()+1}`)
    }
  }

  private initial(): void {
    this.$user.friends$.pipe(
      map(friends => friends.filter(({ isLogin }) => isLogin)),
        tap(friends => console.log('friends', friends)),
        distinctUntilChanged((previous, current) => previous.length !== current.length),
    ).subscribe((friends)=> {
      console.log('friends', friends)
      this.friends.next(friends);
    }
    )
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
    });
  }


  private isNextDayAfterStop(): boolean {
    const today = new Date();
    const stopDay = this.coinInfo?.lastStopDate?.toDate() as Date;
    return today.getFullYear() >= stopDay.getFullYear() 
    && today.getMonth() >= stopDay.getMonth()
    && today.getDate() > stopDay.getDate();
  }
}
