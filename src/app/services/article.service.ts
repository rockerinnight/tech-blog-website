import { MultiArticle } from './../_models/multi-article';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleArticle } from '../_models/single-article';
import { Tag } from '../_models/tag';
import { Profile } from '../_models/profile';
import { SingleComment } from '../_models/single-comment';
import { config } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getMyFeed(skip: number, top: number): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl + `/articles/feed?limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }

  getGlobalFeed(skip: number, top: number): Observable<MultiArticle> {
    return this.http.get(
      config.apiUrl + `/articles?limit=${top}&offset=${skip}`
    ) as Observable<MultiArticle>;
  }

  getArticleDetail(slug: string): Observable<SingleArticle> {
    return this.http.get(config.apiUrl + slug) as Observable<SingleArticle>;
  }
  getcreateArticle(formValue, token: string, tagList): any {
    if (formValue) {
      return this.http.post(config.apiUrl + `/articles`, {
        article: {
          title: formValue.title,
          description: formValue.description,
          body: formValue.body,
          tagList,
        },
      });
    }
  }

  getUpdateArticle(formValue, token: string, slug: string, tagList): any {
    return this.http.put(
      config.apiUrl + `/articles/${slug}`,
      {
        article: {
          title: formValue.title,
          description: formValue.description,
          body: formValue.body,
          tagList,
        },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
  }

  getTag(): Observable<Tag> {
    return this.http.get(config.apiUrl + '/tags') as Observable<Tag>;
  }

  followUser(userName): Observable<Profile> {
    return this.http.post(config.apiUrl + `/profiles/${userName}/follow`, {
      user: {},
    }) as Observable<Profile>;
  }

  unFollowUser(userName): Observable<Profile> {
    return this.http.delete(
      config.apiUrl + `/profiles/${userName}/follow`
    ) as Observable<Profile>;
  }

  favoriteArticle(slug): Observable<SingleArticle> {
    return this.http.post(
      config.apiUrl + `/articles/${slug}/favorite`,
      ''
    ) as Observable<SingleArticle>;
  }

  unFavoriteArticle(slug): Observable<SingleArticle> {
    return this.http.delete(
      config.apiUrl + `/articles/${slug}/favorite`
    ) as Observable<SingleArticle>;
  }

  editArticle(updatedArticle: SingleArticle): Observable<any> {
    const slug = updatedArticle.slug;
    return this.http.put(config.apiUrl + `/articles/${slug}`, {
      article: {
        ...updatedArticle,
      },
    }) as Observable<any>;
  }

  deteleArticle(slug): Observable<SingleArticle> {
    return this.http.delete(
      config.apiUrl + `/articles/${slug}`
    ) as Observable<SingleArticle>;
  }

  addComments(
    newComment: SingleComment,
    slug: string
  ): Observable<SingleComment> {
    return this.http.post(config.apiUrl + `/articles/${slug}/comments`, {
      ...newComment,
    }) as Observable<SingleComment>;
  }
}
