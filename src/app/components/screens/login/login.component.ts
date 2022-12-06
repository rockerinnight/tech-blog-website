import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { take } from 'rxjs/operators';

import { AuthService } from './../../../services/auth.service';

import { User } from 'src/app/models/user.model';
import { LoginDto } from 'src/app/models/login-dto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalidInput = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.isInvalidInput = true;
      return;
    }

    this.isInvalidInput = false;
    const body: LoginDto = {
      user: {
        email: this.loginForm.controls.email.value.trim(),
        password: this.loginForm.controls.password.value.trim(),
      },
    };
    this.authService
      .login(body)
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
