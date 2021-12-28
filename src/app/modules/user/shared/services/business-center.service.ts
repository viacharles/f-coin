import { FirebaseService } from '@shared/services/firebase.service';
import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { Injectable } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { interval, Subscription } from 'rxjs';
import { LoggerService } from '@shared/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessCenterService extends DatabaseService {
  constructor(
    protected $logger: LoggerService,
    protected $fb: FirebaseService,
    protected $user: UserService
  ) {
    super($fb, $logger);
    // 避免因關掉網頁或重整網頁而未能將isDigging設為false，一律在初始進入時重置isDigging狀態。
    this.$fb.request('businessCenter').update({ isDigging: false }, sessionStorage.getItem('id') );
  }

  protected databaseName = 'businessCenter';

  public totalAssets = 0;

  private subscription = new Subscription();

  /**
   * @description 獲得f-coin挖礦相關資訊
   *
   */
  public fetchBusinessStatus(uid: string): void {
    this.fetch().read$(uid);
  }
  /**
   * @description 開啟挖礦後 - 檢查是否已是上次結束的隔天，開始後計算每秒增加後的總f-coin數量，每計算10次將總資產向後端儲存一次。
   */
  public miningStart(uid: string, lastStopDate: Date, totalAssets: number, currentIncomePerSec: number): void {
    this.totalAssets = totalAssets;
    if (this.isOverLastStopDay(new Date(), lastStopDate)) {
      this.$fb
        .request(this.databaseName)
        .update({ isDigging: true }, uid)
        .then(() => this.$logger.systemMessage(`mining started successfully.`))
        .then(
          () =>
          (this.subscription = interval(1000).subscribe((times) => {
            this.countAssets(currentIncomePerSec);
            if (times % 10 === 0) {
              this.updateBusiness(uid);
            }
          }))
        )
        .catch((error: any) => this.$logger.errorMessage(error));
    } else {
      this.$logger.errorMessage('mining is not allowed yet. it"ll be bootable next day');
      // TODO跳出警示窗：關閉後當天內不能再開啟喔！
    }
  }

  /**
   * @description 關閉挖礦後 - 往後端update一次totalAssets，並且直到隔天才能再開啟挖礦。
   */
  public miningEnd(uid: string): void {
    this.$fb
      .request(this.databaseName)
      .update({ isDigging: false, lastStopDate: new Date() }, uid)
      .then(() => this.subscription.unsubscribe());
  }

  /**
   * @description check if it's the next day after the last day stop mining.
   */
  private isOverLastStopDay(today: Date, lastStopDate: Date): boolean {
    console.log('isOverLastStopDay', today.getFullYear(),lastStopDate.getFullYear(), today.getDate(), lastStopDate.getDate())
    return (
      today.getFullYear() >= lastStopDate.getFullYear() &&
      today.getMonth() >= lastStopDate.getMonth() &&
      today.getDate() > lastStopDate.getDate()
    );
  }

  private countAssets(currentIncomePerSec: number): number {
    console.log('countAssets', this.totalAssets + currentIncomePerSec);
    return (this.totalAssets = this.totalAssets + currentIncomePerSec);
  }

  private updateBusiness(uid: string): void {
    this.$fb
      .getDoc(this.databaseName, uid)
      .update({ totalAmount: this.totalAssets }).then(() => console.log('updateBusiness successful', this.totalAssets));
  }
}
