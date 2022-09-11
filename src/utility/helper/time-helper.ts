import * as moment from 'moment';

export class TimeHelper {

    public static get today(): string {
        return TimeHelper.formatDate(new Date());
    }

    public static formatMoment(date: string | Date): moment.Moment {
        return moment(date);
    }

    /**
     * @description 轉換日期格式
     */
    public static formatDate(date: string | Date, format = 'YYYY-MM-DD'): string {
        moment.locale('zh-tw');
        return moment(date).format(format);
    }

    /**
     * 取得特定日期
     * @return ISO
     */
    public static formatSpecDate(
        date: moment.MomentInput,
        amount: moment.DurationInputArg1 = 0,
        unit: moment.DurationInputArg2 = 'day'
    ): string {
        return moment(date).add(amount, unit).toISOString();
    }

    /**
     * 取得特定邊界日期
     * @return ISO
     */
    public static formatBoundaryDate(
        date: moment.MomentInput,
        amount: moment.DurationInputArg1 = 0,
        unit: moment.DurationInputArg2 = 'day',
        start = true,
    ): string {
        const Target = moment(date).add(amount, unit);
        return (start ? Target.startOf(unit) : Target.endOf(unit)).toISOString();
    }

    /**
     * 取得兩日期間距
     */
    public static getOffset(start: moment.MomentInput, end: moment.MomentInput, unit: moment.DurationInputArg2 = 'day'): number {
        const Offset = Math.abs(moment(start).diff(moment(end), unit));
        return !Offset ? Offset : Offset + 1;
    }
}
