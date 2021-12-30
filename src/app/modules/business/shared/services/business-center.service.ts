import { FirebaseService } from '@shared/services/firebase.service';
import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { Injectable } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { interval, Subscription } from 'rxjs';
import { LoggerService } from '@shared/services/logger.service';
import { IBusinessCenter, ICoinInfo } from '@utility/interface/businessCenter.interface';
import firebase from 'firebase';
import { CoinInfo } from '@business/shared/models/coining.model';

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
  }

  protected databaseName = 'businessCenter';

  /**
   * @description 獲得f-coin挖礦相關資訊
   *
   */
  public fetchCoinInfo(uid: string): Promise<CoinInfo> {
    return new Promise<CoinInfo>(resolve => {
      this.fetch().read(uid).then(({ coinInfo }: IBusinessCenter) => resolve(new CoinInfo(coinInfo)));
    });
  }

  /**
   * @description 更新挖礦資訊
   */
  public updateCoinInfo(uid: string, data: ICoinInfo): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.fetchCoinInfo(uid).then(coinInfo => {
        coinInfo.updateInfo(data);
        this.fetch().update({ coinInfo: coinInfo.getData() }, uid).then(() => resolve(true));
      });
    });
  }

}
