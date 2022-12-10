import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { URL } from '../helpers/constants';

import { SingleArticle } from '../models/single-article.model';
import { MultiArticles } from '../models/multi-articles.model';
import { SingleArticleCreateDto } from '../models/single-article-create-dto.model';
import { SingleArticleUpdateDto } from '../models/single-article-update-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  /**
   * Returns most recent articles globally by default,
   * provide `tag`, `author` or `favorited` query parameter to filter results
   * @param tag Filter by tag
   * @param author Filter by author
   * @param favorited Favorited by user
   * @param limit Limit number of articles (default is 20)
   * @param offset Offset/skip number of articles (default is 0)
   */
  getListArticles(params?: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  }): Observable<MultiArticles> {
    let queries = new HttpParams();
    if (params) {
      Object.keys(params).forEach((k) => {
        if (params[k]?.toString()?.length) {
          queries = queries.append(k, params[k]);
        }
      });
    }

    return this.http.get<MultiArticles>(`${URL.API}/articles`, {
      params: queries,
    });
  }

  /**
   * Returns most recent articles created by followed users
   * @param limit Limit number of articles (default is 20)
   * @param offset Offset/skip number of articles (default is 0)
   */
  getFeedArticles(params?: {
    limit?: number;
    offset?: number;
  }): Observable<MultiArticles> {
    let queries = new HttpParams();
    if (params) {
      Object.keys(params).forEach((k) => {
        if (params[k]?.toString()?.length) {
          queries = queries.append(k, params[k]);
        }
      });
    }

    return this.http.get<MultiArticles>(`${URL.API}/articles/feed`, {
      params: queries,
    });
  }

  /**
   * Return details of an article
   * @param slug Id of the selected article
   */
  getArticle(slug: string): Observable<SingleArticle> {
    return this.http.get<SingleArticle>(`${URL.API}/articles/${slug}`);
  }

  /**
   * Create a new article
   * @return Return details of the created article
   */
  createArticle(params: SingleArticleCreateDto): Observable<SingleArticle> {
    return this.http.post<SingleArticle>(`${URL.API}/articles`, params);
  }

  /**
   * Update an existing article
   * @return Return details of the updated article
   * @param slug Id of the updated article
   * *The slug also gets updated when the title is changed
   */
  updateArticle(
    slug: string,
    params: SingleArticleUpdateDto
  ): Observable<SingleArticle> {
    return this.http.put<SingleArticle>(`${URL.API}/articles/${slug}`, {
      params,
    });
  }

  /**
   * Delete an existing article
   * @param slug Id of the deleted article
   */
  deleteArticle(slug: string): Observable<null> {
    return this.http.delete<null>(`${URL.API}/articles/${slug}`);
  }
}
