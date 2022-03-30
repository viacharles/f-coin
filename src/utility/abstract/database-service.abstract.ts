import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';

export abstract class DatabaseService {
  constructor(
    protected $fb: FirebaseService,
    protected $logger: LoggerService
  ) {}

  protected abstract databaseName: string;

  protected fetch(showLoader = true): any {
    return this.$fb.request(this.databaseName, showLoader);
  }
}
