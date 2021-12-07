import { UserService } from '@user/shared/services/user.service';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Friend } from '@user/shared/models/friend.model';
import { CoiningService } from './coining.service';

enum ECoiningAction {
  Activate = 'ON',
  Deactivate = 'OFF',
}

@Component({
  selector: 'app-coining',
  templateUrl: './coining.component.html',
  styleUrls: ['./coining.component.scss'],
})
export class CoiningComponent implements OnInit {
  @ViewChild('tSwitch') tSwitch: ElementRef|null = null;
  constructor(private $user: UserService, public $coining: CoiningService) {
  }
  private friends = new BehaviorSubject<Friend[]>([]);
  public friends$: Observable<Friend[]> = this.friends.asObservable();

  // === 頁面資料 ===
  /**
   * @description 目前上線人數
   */
  public peopleOnlineNumber: number | null = null;
  /**
   * @description 目前績效(顆/秒)
   */
  public gainCoinsPerSec: number | null = null;
  /**
   * @description 按鈕文字
   */
  public buttonText = ECoiningAction.Deactivate;

  ngOnInit(): void {
    this.$user.friends$.subscribe((friends: Friend[]) => {
      const loginNum = friends.filter(friend => friend.isLogin === true).length;
      console.log(`there's ${loginNum} friends login`);
      this.peopleOnlineNumber = loginNum;
      this.gainCoinsPerSec = this.CoiningPerSec(loginNum);
    });
  }

  public coiningSwitch(): void {
    this.$coining.isActive = !this.$coining.isActive;
    this.$coining.isActive === false
      ? this.buttonText = ECoiningAction.Deactivate
      : this.buttonText = ECoiningAction.Activate;
}

  private CoiningPerSec(loginNum: number): number {
    return 1 + (loginNum * .5);
  }
}
