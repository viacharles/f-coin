import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {

  transform(value: firebase.firestore.Timestamp|null ): string {
    if (value) {
      const date = value.toDate();
      const dateFormat = date.toLocaleDateString().split('/');
      let day = '';
      switch (date.getDay()) {
          case 0: day = '日'; break;
          case 1: day = '一'; break;
          case 2: day = '二'; break;
          case 3: day = '三'; break;
          case 4: day = '四'; break;
          case 5: day = '五'; break;
          case 6: day = '六'; break;
      }
      return this.isToday(date) ? '今天'
             : this.isYestday(date) ? '昨天'
             : this.isOtherYear(date) ? `${dateFormat[0]}.${dateFormat[1]}.${dateFormat[2]}`
             : `${dateFormat[1]}月${dateFormat[2]}日(${day})`;
    }
    return '';
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  private isYestday(date: Date): boolean {
    const today = new Date();
    return !this.isToday(date) && (new Date(today.getTime() - (24 * 3600 * 1000)).toDateString()) === date.toDateString();
  }

  private isOtherYear(date: Date): boolean {
    return date.getFullYear() !== new Date().getFullYear();
  }

}
