import { MultiArticle } from './../_models/multi-article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleArticle } from '../_models/single-article';
import { Tag } from '../_models/tag';
import { Profile } from '../_models/profile';
import { SingleComment } from '../_models/single-comment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  myFeedUrl = 'https://conduit.productionready.io/api/articles/feed';
  globalFeedUrl = 'https://conduit.productionready.io/api/articles';
  articleDetailUrl = 'https://conduit.productionready.io/api/articles/';
  tagUrl = 'https://conduit.productionready.io/api/tags';
  profileUrl = 'https://conduit.productionready.io/api';
  followUserUrl = 'https://conduit.productionready.io/api/profiles/';
  favoriteUrl = 'https://conduit.productionready.io//api/articles/';
  editArticleUrl = 'https://conduit.productionready.io//api/articles/';


  constructor(private http: HttpClient) {}

  getMyFeed(): Observable<MultiArticle> {
    return this.http.get(this.myFeedUrl) as Observable<MultiArticle>;
  }

  getGlobalFeed() {
    return this.http.get(this.globalFeedUrl) as Observable<MultiArticle>;
  }

  getArticleDetail(slug) {
    return this.http.get(
      this.articleDetailUrl + slug
    ) as Observable<SingleArticle>;
  }

  getTag() {
    return this.http.get(this.tagUrl) as Observable<Tag>;
  }

  getProfile(userName) {
    return this.http.get(this.profileUrl + `${userName}`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<Profile>;
  }
  followUser(userName) {
    return this.http.post(this.followUserUrl + `${userName}/follow`, '', {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<Profile>;
  }

  unFollowUser(userName) {
    return this.http.delete(this.followUserUrl + `${userName}/follow`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<Profile>;
  }

  favoriteArticle(slug) {
    return this.http.post(this.favoriteUrl + `${slug}/favorite`, '', {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<SingleArticle>;
  }

  unFavoriteArticle(slug) {
    return this.http.delete(this.favoriteUrl + `${slug}/favorite`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<SingleArticle>;
  }

  getTag() {
    return this.http.get(this.tagUrl) as Observable<Tag>;
  }

  getProfile(userName) {
    return this.http.get(this.profileUrl + `${userName}`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<Profile>;
  }

  followUser(userName) {
    return this.http.post(this.followUserUrl + `${userName}/follow`, '', {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<Profile>;
  }

  unFollowUser(userName) {
    return this.http.delete(this.followUserUrl + `${userName}/follow`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<Profile>;
  }

  favoriteArticle(slug) {
    return this.http.post(this.favoriteUrl + `${slug}/favorite`, '', {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<SingleArticle>;
  }

  unFavoriteArticle(slug) {
    return this.http.delete(this.favoriteUrl + `${slug}/favorite`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<SingleArticle>;
  }

  editArticle(slug) {
    return this.http.put(
      this.editArticleUrl + `${slug}`,
      {
        article: {
          title: 'Did you train your dragon?',
        },
      },
      {
        headers: {
          Authorization:
            'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
        },
      }
    ) as Observable<SingleArticle>;
  }

  deteleArticle(slug) {
    return this.http.delete(this.editArticleUrl + `${slug}`, {
      headers: {
        Authorization:
          'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
      },
    }) as Observable<SingleArticle>;
  }

  addComments(slug) {
    return this.http.post(
      this.editArticleUrl + `${slug}/comments`,
      {
        comment: {
          body: 'His name was my name too.',
        },
      },
      {
        headers: {
          Authorization:
            'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUyNzM3LCJ1c2VybmFtZSI6IkRpZW5OTTIiLCJleHAiOjE2MjE4NTk1NTh9.2lU3H8ikbcpfNMz8RrBGLlIy4mLqDgbgd547gAjugaE',
        },
      }
    ) as Observable<SingleComment>;
  }
}
