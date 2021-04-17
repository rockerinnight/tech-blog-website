import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSettings(userName: string) {
    return this.authService.getProfile(userName);
  }

  updateSettings(settingFormValue: any) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .put(config.apiUrl + '/user', { user: { ...settingFormValue } })
        .subscribe(
          (res: any) => {
            resolve();
          },
          (err: any) => {
            reject(err);
          }
        );
    });
  }
}
