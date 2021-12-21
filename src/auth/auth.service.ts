import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '@user/shared/services/user.service';
import { filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';

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
    private $user: UserService
  ) {}

  get isAuth(): string | null {
    return sessionStorage.getItem('id');
  }

  public isAuth$ = this.$auth.authState.pipe(
    tap((res) => {
      if (!res?.uid) {
        this.router
          .navigateByUrl('landing')
          .then(() => console.log('unknown user, please login first'));
      } else {
        sessionStorage.setItem('id', `${res.uid}`);
        this.$user.generateUser((res as firebase.User).uid);
      }
    }),
    filter((res) => !!res?.uid)
  );

  public login({ email, password }: { email: string; password: string }): void {
    this.$auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
      this.router.navigateByUrl(environment.defaultUrl);
    });
  }

  public logout(): void {
    this.$auth
      .signOut()
      .then(() =>
        this.router.navigateByUrl('landing').then(() => sessionStorage.clear())
      );
  }
}
