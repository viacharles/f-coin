import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit() {
    if (this.$auth.isAuth) {
      this.router.navigateByUrl('');
    }
  }

  public form: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });
}
