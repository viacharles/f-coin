import { LoggerService } from '@shared/services/logger.service';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { CoiningAction as Action, ICoiningEvent } from '@user/shared/models/coining.model';
import { BusinessCenterService } from '@user/shared/services/business-center.service';

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
        case Action.FetchBusinessStatus:
          this.$business.fetchBusinessStatus(uid);
          break;
        case Action.MiningStart:
          this.$business.miningStart(uid, lastStopDay, totalAssets, currentIncomePerSec);
          resolve(true);
          break;
        case Action.MiningEnd:
          this.$business.miningEnd(uid);
          resolve(true);
          break;
      }
    }
    );
  }
}
