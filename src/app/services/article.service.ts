import { MultiArticle } from './../_models/multi-article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  myFeedUrl = 'https://conduit.productionready.io/api/articles/feed';
  globalFeedUrl = 'https://conduit.productionready.io/api/articles';
  articleDetailUrl = '';

  constructor(private http: HttpClient) {}

  getMyFeed(): Observable<MultiArticle> {
    return this.http.get(this.myFeedUrl) as Observable<MultiArticle>;
  }
  getGlobalFeed() {
    return this.http.get(this.globalFeedUrl) as Observable<MultiArticle>;
  }
  getArticleDetail() {}
}
