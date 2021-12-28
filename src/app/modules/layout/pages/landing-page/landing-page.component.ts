import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public $auth: AuthService,
    private router: Router
  ) {}

  public form: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  ngOnInit(): void {
    if (this.$auth.isAuth) {
      this.router.navigateByUrl('');
    }
    console.log(this.form)
  }

  public submit({email, password}: {email: string; password: string}): void {
    this.$auth.login({email, password});
  }

  // public formErrorHint(formControl: FormControl): string {
  //   if (this.form.controls[formControl].)
  // }
}
