import { LoggerService } from '@shared/services/logger.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { CoiningAction as Action, ICoiningEvent } from '@business/shared/models/coining.model';
import { BusinessCenterService } from '@business/shared/services/business-center.service';


@Injectable({
  providedIn: 'root'
})
export class CoiningService extends FeatureService<ICoiningEvent, Action> {

  constructor(
    protected $logger: LoggerService,
    public $business: BusinessCenterService,
  ) {
    super($logger);

  }

  protected featureName = 'Coining';

  protected resolveAction({ action, uid, lastStopDay, totalAssets, currentIncomePerSec }: ICoiningEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.FetchCoinInfo:
          this.$business.fetchCoinInfo(uid).then(coinInfo => {
            this.$logger.systemMessage(`Coin info has successfully updated.\n Total Assets: ${coinInfo.totalAmount}`);
            resolve(coinInfo);
          });
          break;
        case Action.MiningStart:

          resolve(true);
          break;
        case Action.MiningEnd:

          resolve(true);
          break;
      }
    }
    );
  }
}
