
import firebase from 'firebase/app';

export interface IBusinessCenter {
  coinInfo: ICoinInfo;
}


export interface ICoinInfo {
  isDigging?: boolean;
  lastStopDate?: firebase.firestore.Timestamp;
  totalAmount?: number;
}
