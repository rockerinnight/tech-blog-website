import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidCreditError = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
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

  login(): void {
    // console.log('logged in!');
    // let result = this.authService.login(this.loginForm.value);
    // console.log(result);

    // if (!result) {
    //   this.invalidCreditError = true;
    //   return;
    // }
    this.router.navigate(['/home']);
  }
}
