import { IUser } from '@utility/interface/user.interface';
import { FirebaseService } from '@shared/services/firebase.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '@user/shared/services/user.service';
import { filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import { LoggerService } from '@shared/services/logger.service';
import { OverlayService } from '@shared/overlay/overlay.service';

/**
 * auth
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private $auth: AngularFireAuth,
    private router: Router,
    private $user: UserService,
    private $logger: LoggerService,
    private $overlay: OverlayService,
    private $fb: FirebaseService
  ) { }

  get isAuth(): string | null {
    return sessionStorage.getItem('id');
  }

  public isAuth$ = this.$auth.authState.pipe(
    tap((res) => {
      if (!res?.uid) {
        this.router
          .navigateByUrl('landing')
          .then(() =>
            this.$logger.errorMessage(
              'Unknown user, please login first',
              null,
              'Auth'
            )
          );
      } else {
        sessionStorage.setItem('id', `${res.uid}`);
        this.$user.generateUser((res as firebase.User).uid);
      }
    }),
    filter((res) => !!res?.uid)
  );

  public login({ email, password }: { email: string; password: string }): void {
    const LoadingId = this.$overlay.startLoading();
    this.$auth
      .signInWithEmailAndPassword(email, password)
      .then(() =>
        this.router
          .navigateByUrl(environment.defaultUrl)
          .then(() => this.$overlay.endLoading(LoadingId))
      )
      .catch(error => {
        this.$overlay.endLoading(LoadingId);
        alert(`${error}`);
      })
  }

  public signOn({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }): void {
    const LoadingId = this.$overlay.startLoading();
    this.$auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }: firebase.auth.UserCredential) =>
        this.initialDBData(
          name,
          user?.uid as string,
          LoadingId
        ).then(() => this.login({ email, password }))
      )
      .catch((error) => {
        window.alert(error);
        this.$overlay.endLoading(LoadingId);
      });
  }

  public logout(): void {
    this.$auth
      .signOut()
      .then(() =>
        this.router.navigateByUrl('landing').then(() => sessionStorage.clear())
      );
  }

  /**
   * @description 註冊後於DB建立對應使用者資料
   */
  private initialDBData(name: string, uid: string, loadingId: string): Promise<void> {
    const initialUserData = new Promise((resolve) =>
      resolve(this.$fb.request('user')
        .create({
          id: uid,
          name,
          friends: [],
          inviteAddFriends: []
        } as IUser, uid)));
    const initialBusinessData = new Promise((resolve) =>
      resolve(this.$fb.request('businessCenter')
        .create({
          coinInfo: {
            isDigging: false,
            lastStopDate: firebase.firestore.Timestamp.fromDate(new Date(0)),
            totalAmount: 0,
          }
        }, uid)));
    return Promise.all([initialUserData, initialBusinessData])
      .then(() => this.$overlay.endLoading(loadingId));
  }
}
