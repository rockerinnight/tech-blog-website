import { Observable } from 'rxjs';
import { Profile } from './../models/profile';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User = null;

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

  getUser(): User {
    return this.user;
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get(
      config.apiUrl + `/profiles/${username}`
    ) as Observable<Profile>;
  }

  signup(user) {
    this.http.post(config.apiUrl + '/users', { user: user }).subscribe(
      (res: any) => {
        this.logUserIn(res.user);
        this.router.navigate(['..']);
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
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(config.apiUrl + '/users/login', { user: user })
        .subscribe((res: any) => {
          this.logUserIn(res.user);
          resolve();
        });
    });
    // this.http.post(config.apiUrl + '/users/login', { user: user }).subscribe(
    //   (res: any) => {
    //     this.logUserIn(res.user);
    //     this.router.navigate(['..']));
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['..']);
  }
}
