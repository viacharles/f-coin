import { Injectable } from '@angular/core';
import { LoggerService } from '@shared/services/logger.service';
import { ECoiningAction, ICoiningEvent } from '@user/shared/models/coining.model';
import { FeatureService } from '@utility/abstract/feature-service.abstract';

@Injectable({
  providedIn: 'root',
})
export class CoiningService extends FeatureService<ICoiningEvent, ECoiningAction>{
  constructor($logger: LoggerService) {
    super($logger);
  }
public isActive = false;
protected featureName = 'Coining';
protected resolveAction({action, id}: ICoiningEvent): Promise<any> {
  return new Promise<any>((resolve) => {
    switch (action) {
      case ECoiningAction.fetchMiningHistory:
        // resolve(this.$user.getChatHistory(id));
        break;
    }
  });
}
}
