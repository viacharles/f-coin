import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private logger: Logger) {}

  public systemMessage = (message = '', params?: any) =>
    params
      ? this.logger.log(`[System]: ${message}`, params)
      : this.logger.log(`[System]: ${message}`)
  public errorMessage = (message = '', params?: any, type = 'System') =>
    params
      ? this.logger.error(`[${type} error]: ${message}`, params)
      : this.logger.error(`[${type} error]: ${message}`)
  public debugMessage = (message = '') =>
    this.logger.debug(
      `%c[Debug]: ${message}`,
      'color: #5EA4FF ; background: #2C0101'
    )
}
