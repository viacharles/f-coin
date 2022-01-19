import { forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { FirebaseService } from '@shared/services/firebase.service';
import { LoggerService } from '@shared/services/logger.service';
import { IUser } from '@utility/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserCenterService extends DatabaseService {

  constructor($fb: FirebaseService, $logger: LoggerService) {
    super($fb, $logger);
  }

  protected databaseName = 'user';


  /**
   * @description 獲得使用者資料
   */
  public fetchUser(uid: string): Promise<IUser> {
    return new Promise<IUser>(resolve => {
      this.fetch()
        .read$(uid)
        .subscribe((user: IUser) => {
          this.$logger.systemMessage(`user ${user.id} profile has been successfully fetched.`);
          resolve(user);
        });
    });
  }

  /**
   * @description 獲得多筆使用者資料
   */
  public fetchUsers(ids: string[]): Promise<IUser[]> {
    return new Promise<IUser[]>(resolve => {
      forkJoin(ids.map(id => this.fetch().read$(id))).subscribe(
        (profiles: any) => {
          this.$logger.systemMessage(`total ${ids.length} user profiles has been successfully fetched.`);
          resolve(profiles as IUser[]);
        }
      );
    });
  }
}
