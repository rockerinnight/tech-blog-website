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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('linhdv5', [Validators.required]),
      email: new FormControl('linhdv5@test.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12345678', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  signUp(): void {
    this.authService.signup(this.signupForm.value);
    if (this.authService.isAuthenticated()) {
      this.isInvalidInput = true;
    }
    this.isInvalidInput = false;
  }
}
