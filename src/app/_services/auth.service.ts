import { Observable } from 'rxjs';
import { config } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedIn: boolean = null;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    // this._loggedIn = true;
    return this._loggedIn;
  }

  hasRError(): boolean {
    return (this._loggedIn = false);
  }

  saveToLS(user): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  signup(user) {
    this._loggedIn = true;
    let currentUser = {
      user: {
        ...user,
      },
    };
    return this.http.post(config.apiUrl + '/users', currentUser);
  }

  login(username: string, password: string): boolean {
    // let mockUser: any = this.http.post(config.apiUrl + '/api/users/login', {username, password});
    // mockUser = mockUser ? JSON.parse(mockUser) : null;

    // if (mockUser) {
    //   if (
    //     user.email === mockUser.email &&
    //     user.password === mockUser.password
    //   ) {
    //     this._loggedIn = true;
    //     return true;
    //   }
    // }
    return false;
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
