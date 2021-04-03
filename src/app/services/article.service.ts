import { MultiArticle } from './../_models/multi-article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleArticle } from '../_models/single-article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  myFeedUrl = 'https://conduit.productionready.io/api/articles/feed';
  globalFeedUrl = 'https://conduit.productionready.io/api/articles';
  articleDetailUrl = 'https://conduit.productionready.io/api/articles/';

  constructor(private http: HttpClient) {}

  getMyFeed(): Observable<MultiArticle> {
    return this.http.get(this.myFeedUrl, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjIwMDI3NDF9.tmX8I-IOi4nRszY1Em5kvbtHmd0TySzrUmLBsD34SjY',
      },
    }) as Observable<MultiArticle>;
  }

  getGlobalFeed() {
    return this.http.get(this.globalFeedUrl, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjIwMDI3NDF9.tmX8I-IOi4nRszY1Em5kvbtHmd0TySzrUmLBsD34SjY',
      },
    }) as Observable<MultiArticle>;
  }

  getArticleDetail(slug) {
    return this.http.get(
      this.articleDetailUrl + slug
    ) as Observable<SingleArticle>;
  }
}
