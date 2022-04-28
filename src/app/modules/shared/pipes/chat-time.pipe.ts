import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app';

@Pipe({
  name: 'chatTime'
})
export class ChatTimePipe implements PipeTransform {

  transform(value: firebase.firestore.Timestamp): unknown {
    return value.toDate().toLocaleTimeString().replace(/[:]\d{2}$/, '');
  }

}
