import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '@utility/base/base-component';
import { TimeHelper } from '@utility/helper/time-helper';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseComponent {

  /**
   * 選擇的日期 資料類型：Date
   */
  @Input() focusDate!: string;
  /**
   * 月曆檢視月份 資料類型：Date
   */
  @Input() monthDate = TimeHelper.formatBoundaryDate(TimeHelper.today, 0, 'month');
  /**
   * 為false時日期預設為黑色,淡化日期為灰色
   */
  @Input() reverse = false;
  /**
   * 淡化日期
   */
  @Input() fadeDates: string[] = [];
  @Output() afterDateClick = new EventEmitter<string>();

  get year(): string {
    return TimeHelper.formatDate(this.monthDate, 'YYYY');
  }

  get month(): string {
    return TimeHelper.formatDate(this.monthDate, 'M');
  }

  /** 最舊月份 */
  isOldestMonth = false;
  /** 最新月份 */
  isLatestMonth = true;

  constructor() {
    super();
  }

  public weekDays: string[] = [];
  public monthDays: string[][] = [];

  protected onInit(): void {
    this.weekDays = this.getWeekDays();
    this.monthDate = TimeHelper.formatBoundaryDate(this.focusDate, 0, 'month');
    this.chunkByWeek(7, this.getMonthDates()).then(days => {
      this.monthDays = this.filterCurrentMonth(days);
    });
  }

  public switch(amount: number): void {
    this.monthDate = TimeHelper.formatSpecDate(this.monthDate, amount, 'month');
    this.chunkByWeek(7, this.getMonthDates()).then(days => {
      this.monthDays = this.filterCurrentMonth(days);
      this.isLatestMonth = TimeHelper.formatDate(this.monthDate, 'MM') === TimeHelper.formatDate(this.fadeDates[this.fadeDates.length - 1], 'MM');
      this.isOldestMonth = TimeHelper.formatDate(this.monthDate, 'MM') === TimeHelper.formatDate(this.fadeDates[0], 'MM');
    });
  }

  public isCurrentMonth(date: string): boolean {
    return TimeHelper.formatDate(date, 'MM') === TimeHelper.formatDate(this.monthDate, 'MM');
  }

  public isToday(date: string): boolean {
    return TimeHelper.formatDate(date) === TimeHelper.today;
  }

  public isFadeDate(day: string): boolean {
    return this.fadeDates.some(fadeDay => this.reverse ? fadeDay === day : fadeDay !== day);
  }

  public focus(day: string): void {
    this.afterDateClick.emit(day);
    this.focusDate = day;
  }

  private getWeekDays(): string[] {
    const WeekDays = [];
    const FirstDay = TimeHelper.formatBoundaryDate(TimeHelper.today, 0, 'week');
    while (WeekDays.length < 7) {
      WeekDays.push(TimeHelper.formatDate(TimeHelper.formatSpecDate(FirstDay, WeekDays.length), 'dd'));
    }
    return WeekDays;
  }

  private getMonthDates(): string[] {
    const FirstDate = TimeHelper.formatBoundaryDate(this.monthDate, 0, 'week');
    const EndDate = TimeHelper.formatBoundaryDate(TimeHelper.formatBoundaryDate(this.monthDate, 0, 'month', false), 0, 'week', false);
    const MonthDates = [];
    while (MonthDates.length < TimeHelper.getOffset(FirstDate, EndDate)) {
      MonthDates.push(TimeHelper.formatSpecDate(FirstDate, MonthDates.length));
    }
    return MonthDates.map(date => TimeHelper.formatDate(date));
  }

  private filterCurrentMonth(daysGroup: string[][]): string[][] {
    return daysGroup.map((days, index, arr) => {
      return days.map(day => {
              if ((index === 0 || index === (arr.length - 1)) && !this.isCurrentMonth(day)) { return ''; }
              return day;
            });
    });
  }

  /**
   * 每數個分成一組
   * @param num 分成一組的基數
   */
  private chunkByWeek(num: number, data: string[]): Promise<string[][]> {
    return new Promise<string[][]>((resolve) => {
      const Result = [];
      for (let i = 0; i < data.length; i = i + num) {
        Result.push(data.slice(i, i + num));
      }
      resolve(Result);
    });
  }

}
