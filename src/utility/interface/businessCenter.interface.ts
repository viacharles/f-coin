
import firebase from 'firebase/app';

export interface IBusinessCenter {
  isDigging: boolean;
  lastStopDate: firebase.firestore.Timestamp;
  totalAmount: number;
}
