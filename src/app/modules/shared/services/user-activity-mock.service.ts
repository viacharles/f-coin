import { Injectable } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UserActivityMockService {

  constructor(private $fireBase: FirebaseService, private $auth: AuthService) {
  }
  private updateDuration = (Math.random() * 3);
  private updateData = {
    online: (Math.random() * 10) <= 5 ? true : false,
  };
  private friendsRandomOnline(): void{

  }

}
