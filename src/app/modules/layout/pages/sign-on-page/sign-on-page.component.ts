import { AuthService } from 'src/auth/auth.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EIndividualPage } from '@utility/enum/route.enum';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-on-page',
  templateUrl: './sign-on-page.component.html',
  styleUrls: ['./sign-on-page.component.scss']
})
export class SignOnPageComponent implements OnInit {

  constructor(private router: Router, public fb: FormBuilder, private $fb: FirebaseService, private $auth: AuthService) { }

  public form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  }
  )

  ngOnInit(): void {
  }

  public signOn(): void {
    if (this.form.valid) {
      this.$auth.signOn({
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value
      })
    }
  }

  public toLandingPage(): void {
    this.router.navigateByUrl(EIndividualPage.Landing);
  }

  // public noSpace(event: KeyboardEvent): void {
  //   if ( (<Event>event). ) {
  //     event.value = event.value.replace(/\s+/g,'');
  //   }
  // }
}
