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
   * 選擇的日期 資料類型：Date，如果日期模式為日：
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

  /** 最舊月/年份 */
  isOldest = false;
  /** 最新月/年份 */
  isLatest = true;
  /** 日期模式 */
  isDateType = true;

  constructor() {
    super();
  }

  public weekDays: string[] = [];
  public monthDays: string[][] = [];
  public yearMonths: string[][] = [];

  protected onInit(): void {
    this.weekDays = this.getWeekDays();
    this.chunkByNumber(3, this.getMonths()).then(months =>
      this.yearMonths = months
    );
    this.monthDate = TimeHelper.formatBoundaryDate(this.focusDate, 0, 'month');
    this.chunkByNumber(7, this.getMonthDates()).then(days => {
      this.monthDays = this.filterCurrentMonth(days);
    });
    this.disableSwitch();
  }

  public switch(amount: number): void {
    this.monthDate = TimeHelper.formatSpecDate(this.monthDate, amount, this.isDateType ? 'month' : 'year');
    this.chunkByNumber(7, this.getMonthDates()).then(days => {
      this.monthDays = this.filterCurrentMonth(days);
    });
    this.disableSwitch();
  }

  public switchType(): void {
    this.isDateType = !this.isDateType;
    this.disableSwitch();
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

  public isFadeMonth(month: string): boolean {
    return this.fadeDates.some(fadeDay => {
      const Month = TimeHelper.formatDate(fadeDay, 'M');
      return this.reverse ? Month === month : Month !== month;
    });
  }

  public isSelectMonth(month: string): boolean {
    return TimeHelper.formatDate(this.focusDate, 'M')  === month;
  }

  public toLatest(): void {
    this.monthDate = TimeHelper.formatBoundaryDate(this.fadeDates[this.fadeDates.length - 1], 0, this.isDateType ? 'month' : 'year');
    this.focusDate = this.fadeDates[this.fadeDates.length - 1];
    this.disableSwitch();
  }

  /**
   * 月模式時，將模式轉換成日後，再聚焦在日
   * @param date 有兩種時間格式，日期：YYYY-MM-DD 月：M
   */
  public focus(date: string): void {
    if (new RegExp(/^\d{1,2}$/).test(date)) {
      const Month = date;
      this.isDateType = !this.isDateType;
      this.monthDate = TimeHelper.formatBoundaryDate(`${this.year}-${Month}-1`, 0, 'month');
      this.switch(0);
      const SameMonthDays =  this.fadeDates.filter(day => TimeHelper.formatDate(day, 'M') === Month);
      this.focusDate = SameMonthDays[SameMonthDays.length - 1];
      this.afterDateClick.emit(this.focusDate);
    } else {
      const Day = date;
      this.focusDate = Day;
      this.disableSwitch();
      this.afterDateClick.emit(Day);
    }
  }

  private getWeekDays(): string[] {
    const WeekDays = [];
    const FirstDay = TimeHelper.formatBoundaryDate(TimeHelper.today, 0, 'week');
    while (WeekDays.length < 7) {
      WeekDays.push(TimeHelper.formatDate(TimeHelper.formatSpecDate(FirstDay, WeekDays.length), 'dd'));
    }
    return WeekDays;
  }

  private getMonths(): string[] {
    return Array.from(Array(12).keys()).map(num => `${num + 1}`);
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

  private disableSwitch(): void {
    this.isLatest =
    TimeHelper.formatDate(this.monthDate, this.isDateType ? 'MM' : 'YYYY') ===
    TimeHelper.formatDate(this.fadeDates[this.fadeDates.length - 1], this.isDateType ? 'MM' : 'YYYY');
    this.isOldest =
    TimeHelper.formatDate(this.monthDate, this.isDateType ? 'MM' : 'YYYY') ===
    TimeHelper.formatDate(this.fadeDates[0], this.isDateType ? 'MM' : 'YYYY');
  }

  /** 非本月的日期轉為空字串 */
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
  private chunkByNumber(num: number, data: string[]): Promise<string[][]> {
    return new Promise<string[][]>((resolve) => {
      const Result = [];
      for (let i = 0; i < data.length; i = i + num) {
        Result.push(data.slice(i, i + num));
      }
      resolve(Result);
    });
  }

}
