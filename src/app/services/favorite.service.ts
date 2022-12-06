import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { URL } from '../helpers/constants';
import { SingleArticle } from '../models/single-article.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  /**
   * Favorite a article
   * Return the details of the favorited article
   * @param slug Id of the favorited article
   */
  favoriteArticle(slug: string): Observable<SingleArticle> {
    return this.http.post<SingleArticle>(
      `${URL.API}/articles/${slug}/favorite`,
      null
    );
  }

  /**
   * Unfavorite a favorited article
   * Return the details of the unfavorited article
   * @param slug Id of the unfavorited article
   */
  unFavoriteArticle(slug: string): Observable<SingleArticle> {
    return this.http.delete<SingleArticle>(
      `${URL.API}/articles/${slug}/favorite`
    );
  }
}
