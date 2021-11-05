import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private $auth: AngularFireAuth, private router: Router) {}

  get isAuth() {
    return sessionStorage.getItem('id');
  }

  public isAuth$ = this.$auth.authState.pipe(
    tap((uid) => {
      if (!uid) {
        this.router
          .navigateByUrl('landing')
          .then(() => console.log('unknown user, please login first'));
      }
    }),
    filter((uid) => !!uid)
  );

  public login({ email, password }: { email: string; password: string }) {
    this.$auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
      sessionStorage.setItem('id', `${user?.uid}`);
      this.router.navigateByUrl('');
    });
  }

  public logout() {
    this.$auth
      .signOut()
      .then(() =>
        this.router.navigateByUrl('landing').then(() => sessionStorage.clear())
      );
  }
}
