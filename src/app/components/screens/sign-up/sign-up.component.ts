import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { take } from 'rxjs/operators';

import { AuthService } from './../../../services/auth.service';

import { User } from 'src/app/models/user.model';
import { RegistrationDto } from 'src/app/models/registration-dto.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  isInvalidInput = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signUp(): void {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      this.isInvalidInput = true;
      return;
    }

    this.isInvalidInput = false;
    const signupBody: RegistrationDto = {
      user: {
        username: this.signupForm.controls.username.value.trim(),
        email: this.signupForm.controls.email.value.trim(),
        password: this.signupForm.controls.password.value.trim(),
      },
    };
    this.authService
      .register(signupBody)
      .pipe(take(1))
      .subscribe(
        (res: User) => {
          if (res?.user) {
            localStorage.setItem('ACCESS_TOKEN', res.user.token);
            this.router.navigateByUrl('/home');
          }
        },
        (e) => {
          this.isInvalidInput = true;
          console.log(e);
        }
      );
  }
}
