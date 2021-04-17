import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  private userName: string = '';
  private localUser: any = {};

  needConfirm: boolean = false;
  changingPassword: boolean = false;
  isSamePW: boolean = true;
  isSuccess: boolean = false;
  isTaken: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settingForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      bio: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      cfPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.localUser = JSON.parse(localStorage.getItem('user'));
    this.userName = this.localUser.username;

    this.settingsService.getSettings(this.userName).subscribe((res: any) => {
      this.settingForm.setValue({
        email: this.localUser.email,
        password: '',
        cfPassword: '',
        bio: res.profile.bio,
        image: res.profile.image,
        username: res.profile.username,
      });
    });
  }

  updateSettings(): void {
    console.log(this.settingForm);
    this.needConfirm = true;
    this.settingsService
      .updateSettings(this.settingForm.value)
      .then((res: any) => {
        this.isSuccess = true;
        this.isTaken = false;
        // console.log('setting updated');
        setTimeout(() => {
          this.router.navigate([`/profile/${this.userName}`]);
        }, 2000);
      })
      .catch((err: any) => {
        this.isSuccess = false;
        this.isTaken = true;
        // console.log('setting errors');
        console.log(err);
      });
  }

  isValidPassword() {
    this.isSamePW =
      this.settingForm.value.password.length ===
      this.settingForm.value.cfPassword.length
        ? true
        : false;
  }

  cfPasswordNoti() {
    this.needConfirm = true;
  }

  changePassword() {
    this.needConfirm = true;
    this.changingPassword = true;
    this.isSamePW = false;
  }

  backPersonal() {
    this.changingPassword = false;
  }
}
