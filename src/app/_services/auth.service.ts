import { Profile } from './../_models/profile';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = null;
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    if (this.user === null) {
      let localUser = localStorage.getItem('user');
      if (localUser) {
        this.user = JSON.parse(localUser);
      }
    }
    return !!this.user;
  }

  signup(user) {
    this.http.post(config.apiUrl + '/users', { user: user }).subscribe(
      (res: any) => {
        this.logUserIn(res.user);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logUserIn(user): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(user) {
    this.http.post(config.apiUrl + '/users/login', { user: user }).subscribe(
      (res: any) => {
        this.logUserIn(res.user);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log(error);
      }
    );
    // return new Promise<void>((resolve, reject) => {
    //   this.http
    //     .post(config.apiUrl + '/users/login', { user: user })
    //     .subscribe((res: any) => {
    //       this.logUserIn(res.user);
    //       resolve();
    //     });
    // });
  }

  // logout() {
  //   return this.http
  //     .post<any>(`${config.apiUrl}/logout`, {
  //       refreshToken: this.getRefreshToken(),
  //     })
  //     .pipe(
  //       tap(() => this.doLogoutUser()),
  //       mapTo(true),
  //       catchError((error) => {
  //         alert(error.error);
  //         return of(false);
  //       })
  //     );
  // }
}
