import { Component, EventEmitter, Input, OnInit, Output, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { BaseComponent } from '@utility/base/base-component';
import { TimeHelper } from '@utility/helper/time-helper';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseComponent {

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

  constructor() {
    super();
  }

  public weekDays: string[] = [];
  public monthDays: string[][] = [];

  protected onInit(): void {
    this.weekDays = this.getWeekDays();
    this.chunkByWeek(7, this.getMonthDates()).then(days => {
      this.monthDays = this.filterCurrentMoth(days);
    });
  }

  public switch(amount: number): void {
    this.monthDate = TimeHelper.formatSpecDate(this.monthDate, amount, 'month');
    this.chunkByWeek(7, this.getMonthDates()).then(days => {
      this.monthDays = this.filterCurrentMoth(days);
    });
  }

  public isCurrentMonth(date: string): boolean {
    return TimeHelper.formatDate(date, 'MM') === TimeHelper.formatDate(this.monthDate, 'MM');
  }

  public isToday(date: string): boolean {
    return TimeHelper.formatDate(date) === TimeHelper.today;
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

  private filterCurrentMoth(daysGroup: string[][]): string[][] {
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
