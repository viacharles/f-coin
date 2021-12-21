import { LoggerService } from '@shared/services/logger.service';
import { IEvent } from '@utility/interface/common.interface';

export abstract class FeatureService<Event extends IEvent<Action>, Action> {
  constructor(protected $logger: LoggerService) {}
  /**
   * @description will console after event has been fired
   */
  protected abstract featureName: string;

  /**
   * @description define what thing should do after action be fired
   */
  protected abstract resolveAction(event: Event): Promise<any>;

  public fireEvent<T>(event: Event): Promise<T> {
    this.$logger.debugMessage(
      `${this.featureName} event ${event.action} has been triggered.`
    );
    return this.resolveAction(event).then((result) => result);
  }
}
