import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app';

@Pipe({
  name: 'chatTime'
})
export class ChatTimePipe implements PipeTransform {

  transform(value: firebase.firestore.Timestamp): unknown {
    const valueArray = Array.from(value.toDate().toLocaleTimeString().replace(/:\d{1,2}/, ''));
    valueArray.splice(2, 0, ' ');
    return  valueArray.join('');
  }

}
