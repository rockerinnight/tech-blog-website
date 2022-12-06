import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { User } from 'src/app/models/user.model';
import { UserDto } from 'src/app/models/user-dto.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;

  changingPassword = false;

  isPwMatched: Observable<boolean>;

  isSuccess = false;
  isTaken = { status: false, key: '' };

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingSpinnerService.showSpinner();
    this.initForm();

    this.isPwMatched = combineLatest([
      this.settingForm.get('password')?.valueChanges.pipe(startWith('')),
      this.settingForm.get('cfPassword')?.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([newPw, newCfPw]: Array<string>) => {
        if (!newCfPw) {
          return true;
        }

        return newPw?.trim() === newCfPw?.trim();
      })
    );

    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe(
        (res: User) => {
          if (res?.user) {
            this.settingForm.patchValue({
              ...res.user,
              password: '',
              cfPassword: '',
            });
            this.loadingSpinnerService.hideSpinner();
          }
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner();
        }
      );
  }

  updateSettings(): void {
    this.loadingSpinnerService.showSpinner();

    if (!this.isValidForm()) {
      this.loadingSpinnerService.hideSpinner();
      return;
    }

    const { image, username, bio, email, password } = this.settingForm.value;

    const params: UserDto = {
      user: this.changingPassword
        ? { password }
        : { image, username, bio, email },
    };

    this.authService
      .updateUser(params)
      .pipe(take(1))
      .subscribe(
        (res: User) => {
          this.isTaken.status = false;
          this.isSuccess = true;

          localStorage.setItem('ACCESS_TOKEN', res.user.token);
          this.loadingSpinnerService.hideSpinner();
        },
        (e) => {
          console.log(e);

          const errorCCtrl = e.error.includes('email')
            ? 'email'
            : e.error.includes('username')
            ? 'username'
            : '';

          this.isTaken = {
            status: true,
            key: errorCCtrl,
          };
          this.isSuccess = false;

          this.loadingSpinnerService.hideSpinner();
        }
      );
  }

  private isValidForm(): boolean {
    if (this.changingPassword) {
      const pwCtrl = this.settingForm.get('password');
      const cfPwCtrl = this.settingForm.get('cfPassword');

      pwCtrl.markAllAsTouched();
      cfPwCtrl.markAllAsTouched();

      const isPwMatched = pwCtrl.value.trim() === cfPwCtrl.value.trim();

      return pwCtrl.valid && cfPwCtrl.valid && isPwMatched;
    }

    const imgCtrl = this.settingForm.get('image');
    const usernameCtrl = this.settingForm.get('username');
    const bioCtrl = this.settingForm.get('bio');
    const emailCtrl = this.settingForm.get('email');

    imgCtrl.markAllAsTouched();
    usernameCtrl.markAllAsTouched();
    bioCtrl.markAllAsTouched();
    emailCtrl.markAllAsTouched();

    return (
      imgCtrl.valid && usernameCtrl.valid && bioCtrl.valid && emailCtrl.valid
    );
  }

  private initForm(): void {
    this.settingForm = this.fb.group({
      image: [''],
      username: ['', Validators.required],
      bio: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cfPassword: ['', Validators.required],
    });
  }
}
