import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  isInvalidInput: boolean = null;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUp(): void {
    // const currURL = this.router.url;
    this.authService
      .signup(this.signupForm.value)
      .then(() => {
        this.isInvalidInput = false;
        setTimeout(() => {
          this.router.navigate(['..']);
        }, 2000);
      })
      .catch(() => {
        this.isInvalidInput = true;
      });
  }
}
