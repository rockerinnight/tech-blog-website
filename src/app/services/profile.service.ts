import { MultiArticle } from './../_models/multi-article';
import { AuthService } from './../_services/auth.service';
import { config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyArticles(username: string): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl + `/articles?author=${username}&limit=5&offset=0`
    ) as Observable<MultiArticle>;
  }
}
