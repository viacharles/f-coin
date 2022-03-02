import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {

  transform(value: firebase.firestore.Timestamp ): string {
    const date = value.toDate();
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
    const dateFormat = date.toLocaleDateString().replace(/^\d{1,2}:/, '').split('/');
    dateFormat.shift();
    return this.isToday(date) ? '今天'
           : this.isYestday(date) ? '昨天'
           : `${dateFormat[0]}月${dateFormat[1]}日(${day})`;
  }

  private isToday(date: Date): boolean {
    return date.getDate() === new Date().getDate();
  }

  private isYestday(date: Date): boolean {
    const today = new Date();
    return today !== date && (new Date(today.getTime() - (24 * 3600 * 1000)).getDate()) === date.getDate();
  }

}
