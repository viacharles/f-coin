import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { BaseComponent } from '@utility/base/base-component';
import { TimeHelper } from '@utility/helper/time-helper';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseComponent {

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
  private monthDate = TimeHelper.formatBoundaryDate(TimeHelper.today, 0, 'month');


  protected onInit(): void {
    this.weekDays = this.getWeekDays();
    this.monthDays = this.chunkByWeek(7, this.getMonthDates());

  }

  public switch(amount: number) {
    this.monthDate = TimeHelper.formatSpecDate(this.monthDate, amount, 'month');
    this.monthDays = this.chunkByWeek(7, this.getMonthDates());
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

  /**
   * 每數個分成一組
   * @param num 分成一組的基數
   */
  private chunkByWeek(num: number, data: string[]): string[][] {
    const Result = [];
    for (let i = 0; i <= data.length; i = i + num) {
      Result.push(data.slice(i, i + num));
    }
    return Result;
  }

}
