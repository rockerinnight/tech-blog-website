import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  baseUrl = 'https://conduit.productionready.io/api/profiles/:DaDV2';

  constructor(private http: HttpClient) {}
  getSettings() {
    return this.http.get(this.baseUrl, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU1NjQ5LCJ1c2VybmFtZSI6IkRhRFYyIiwiZXhwIjoxNjIyNDcxNTQ3fQ.hEOl7yoaPjB2J-6n4EUT4bSlnmSS1CsA6m9sbwTu8rU',
      },
    });
  }
}
