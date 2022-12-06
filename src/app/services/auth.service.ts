import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { URL } from '../helpers/constants';

import { User } from '../models/user.model';
import { UserDto } from '../models/user-dto.model';
import { LoginDto } from '../models/login-dto.model';
import { RegistrationDto } from '../models/registration-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('ACCESS_TOKEN');
  }

  login(params: LoginDto): Observable<User> {
    return this.http.post<User>(`${URL.API}/users/login`, params);
  }

  register(params: RegistrationDto): Observable<User> {
    return this.http.post<User>(`${URL.API}/users`, params);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${URL.API}/user`);
  }

  updateUser(params: UserDto) {
    return this.http.put<User>(`${URL.API}/user`, params);
  }

  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigateByUrl('/home');
  }
}
