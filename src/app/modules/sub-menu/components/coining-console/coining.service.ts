import { takeUntil } from 'rxjs/operators';
import { interval, Subscription, Subject } from 'rxjs';
import { UserService } from '@user/shared/services/user.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { CoiningAction as Action, ICoiningEvent } from '@user/shared/models/business.model';
import { User } from '@user/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CoiningService extends FeatureService<ICoiningEvent, Action> {

  constructor(
    protected $logger: LoggerService,
    public $user: UserService,
    private $fb: FirebaseService)
    {
      super($logger);
      this.$user.friends$.subscribe(friends => this.friendsNums = friends.length);
      this.$user.user$.subscribe(user => this.user = user);
    }

  protected featureName = 'Coining';
  private isDayChanged = new Subject<boolean>();
  private isDayChanged$ = this.isDayChanged.asObservable();
  public friendsNums = 0;
  private user: User|null = null;

  private subscription = new Subscription();

  /**
   * @description 當下每秒鑄造f-coin數量
   * ：基本1顆，每一個好友在線加0.5顆
   */
  get currentIncomePerSec(): number {
    return 1 + this.friendsNums * .5;
  }

  protected resolveAction({action}: ICoiningEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.miningStart:
          this.miningStart();
          resolve(true);
          break;
        case Action.miningEnd:
          this.miningEnd();
          resolve(true);
          break;
      }
    }
    );
  }

  /**
   * @description 開啟挖礦後 - 抓一次totalAssets數值，然後在畫面顯示每秒增加後的總f-coin數量，直到當天結束
   */
  private miningStart(): void {
    const today = new Date().getDay();
    this.$fb.request('user').update( {isCoining: true}, this.user?.id);
    this.subscription = interval(1000).pipe(takeUntil(new Date().getDay() !== today)).subscribe( _ => this.user?.totalAssets =  this.user?.totalAssets + this.currentIncomePerSec);
  }

  /**
   * @description 關閉挖礦後 - 往後端update一次totalAssets，並且直到隔天才能再開啟。
   */
  private miningEnd(): void {
    this.$fb.request('user').update( {isCoining: false}, this.user?.id);
  }

}
