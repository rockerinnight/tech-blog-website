import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { URL } from '../helpers/constants';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  /**
   * Return the profile of a user
   * @param username username of the user
   */
  getProfile(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${URL.API}/profiles/${username}`);
  }

  /**
   * Follow a user
   * Return the profile of the followed user
   * @param userName username of the followed user
   */
  followUser(userName: string): Observable<Profile> {
    return this.http.post<Profile>(
      `${URL.API}/profiles/${userName}/follow`,
      null
    );
  }

  /**
   * Unfollow a followed user
   * Return the profile of the unfollowed user
   * @param userName username of the unfollowed user
   */
  unFollowUser(userName: string): Observable<Profile> {
    return this.http.delete<Profile>(`${URL.API}/profiles/${userName}/follow`);
  }
}
