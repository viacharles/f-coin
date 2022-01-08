import { OverlayService } from '@shared/overlay/overlay.service';
import { ICoinInfo } from '@utility/interface/businessCenter.interface';
import { BehaviorSubject, interval, Subscription, forkJoin } from 'rxjs';
import { LoggerService } from '@shared/services/logger.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { CoinInfo, CoiningAction as Action, ICoiningEvent } from '@business/shared/models/coining.model';
import { BusinessCenterService } from '@business/shared/services/business-center.service';
import { take, switchMap, map } from 'rxjs/operators';
import { UserService } from '@user/shared/services/user.service';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CoiningService extends FeatureService<ICoiningEvent, Action> {

  constructor(
    protected $logger: LoggerService,
    private $business: BusinessCenterService,
    private $user: UserService,
    private $overlay: OverlayService
  ) {
    super($logger);
  }

  protected featureName = 'Coining';

  private assets = new BehaviorSubject<number>(0);
  public assets$ = this.assets.asObservable();
  private subscription: Subscription | null = null;

  protected resolveAction({ action, id, info }: ICoiningEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchCoinInfo:
          this.assets$.pipe(take(1)).subscribe(
            totalAmount => {
              if (totalAmount !== 0) {
                this.fireEvent({
                  action: Action.UpdateCoinInfo,
                  id,
                  info: { totalAmount } as ICoinInfo
                }).then(() => resolve(this.fetchCoinInfo(id as string)));
              } else {
                resolve(this.fetchCoinInfo(id as string));
              }
            }
          );
          break;
        case Action.UpdateCoinInfo:
          resolve(this.$business.updateCoinInfo(id as string, info as ICoinInfo));
          break;
        case Action.StartDigging:
          resolve(
            this.fireEvent({
              action: Action.UpdateCoinInfo,
              id,
              info: { isDigging: true } as ICoinInfo
            }).then(() => {
              if (!this.subscription) {
                this.subscription = new Subscription();
                this.subscription.add(this.settlement());
                this.subscription.add(this.asyncTotalAmount(id as string));
              }
            })
          );
          break;
        case Action.EndDigging:
          this.assets$.pipe(take(1)).subscribe(totalAmount => {
            if (this.subscription) {
              this.subscription.unsubscribe();
              this.subscription = null;
            }
            resolve(
              this.fireEvent({
                action: Action.UpdateCoinInfo,
                id,
                info: {
                  isDigging: false,
                  lastStopDate: firebase.firestore.Timestamp.now(),
                  totalAmount
                } as ICoinInfo
              })
            );
          });
          break;
      }
    }
    );
  }

  /**
   * @description 資產結算
   */
  private settlement(): Subscription {
    return interval(1000)
      .pipe(switchMap(() => forkJoin([
        this.assets$.pipe(take(1)),
        this.$user.friends$.pipe(
          take(1),
          map(friends => friends.filter(({ isLogin }) => isLogin).length)
        )
      ])))
      .subscribe(([totalAmount, friendsNumber]) => this.updateTotalAmount(totalAmount, friendsNumber));
  }

  /**
   * @description 同步db資產資料
   */
  private asyncTotalAmount(id: string): Subscription {
    return interval(10000)
      .pipe(switchMap(() => this.assets$.pipe(take(1))))
      .subscribe(totalAmount => this.fireEvent({
        action: Action.UpdateCoinInfo,
        id,
        info: { totalAmount } as ICoinInfo
      }));
  }

  private fetchCoinInfo(uid: string): Promise<CoinInfo> {
    const loaderId = this.$overlay.startLoading();
    return new Promise<CoinInfo>(resolve => this.$business.fetchCoinInfo(uid).then(coinInfo => {
      this.$logger.systemMessage(`Coin info has successfully updated.\n Total Assets: ${coinInfo.totalAmount}`);
      this.assets.next(coinInfo.totalAmount || 0);
      this.$overlay.endLoading(loaderId);
      resolve(coinInfo);
    }));
    
  }

  /**
   * @param totalAmount origin
   */
  private updateTotalAmount(originAmount: number, friendsNumber: number): void {
    this.assets.next(originAmount + 1 + 0.5 * friendsNumber);
  }
}
