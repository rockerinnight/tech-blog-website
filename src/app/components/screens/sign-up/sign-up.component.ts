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
  invalidCreditError: boolean = false;
  errorEmail: string = null;
  errorUsername: string = null;

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
    this.authService.signup(this.signupForm.value).subscribe(
      (res) => {
        this.invalidCreditError = false;
        // this.authService.isAuthenticated();
        this.authService.saveToLS(res);
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        this.invalidCreditError = true;
        if (error.errors.hasOwnProperty('username')) {
          this.errorUsername = 'This username ' + error.errors.username[0];
        }
        if (error.errors.hasOwnProperty('email')) {
          this.errorEmail = 'This email ' + error.errors.email[0];
        }
      }
    );
  }
}
