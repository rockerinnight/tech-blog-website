import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { TagService } from 'src/app/services/tag.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { Tags } from 'src/app/models/tag.model';
import { MultiArticles } from 'src/app/models/multi-articles.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  viewMode: 'global' | 'feed' | 'tag' = 'global';
  selectedTag = '';

  tags$: Observable<String[]>;
  globalArticles$: Observable<MultiArticles>;
  feedArticles$: Observable<MultiArticles>;
  tarArticles$: Observable<MultiArticles>;

  globalPageChanged$ = new BehaviorSubject(null);
  feedPageChanged$ = new BehaviorSubject(null);
  tagPageChanged$ = new BehaviorSubject(null);

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    public authService: AuthService,
    private articleService: ArticleService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingSpinnerService.showSpinner('home-articles');
    this.loadingSpinnerService.showSpinner('tag-list');

    this.route.queryParams.subscribe((res: any) => {
      if (res?.tag?.length) {
        this.openTagView(res.tag);
      }
    });

    this.tags$ = this.tagService.getTags().pipe(
      map((res: Tags) => res.tags),
      tap(() => this.loadingSpinnerService.hideSpinner('tag-list'))
    );

    this.globalArticles$ = this.globalPageChanged$.pipe(
      switchMap((pageParams: any) => {
        return pageParams
          ? this.articleService.getListArticles(pageParams)
          : this.articleService.getListArticles();
      }),
      catchError((err) => {
        this.loadingSpinnerService.hideSpinner('home-articles');
        console.log(err);
        return of({ articles: [], articlesCount: 0 });
      }),
      tap(() => this.loadingSpinnerService.hideSpinner('home-articles'))
    );

    this.feedArticles$ = this.feedPageChanged$.pipe(
      switchMap((pageParams: any) => {
        return pageParams
          ? this.articleService.getFeedArticles(pageParams)
          : this.articleService.getFeedArticles();
      }),
      catchError((err) => {
        this.loadingSpinnerService.hideSpinner('home-articles');
        console.log(err);
        return of({ articles: [], articlesCount: 0 });
      }),
      tap(() => this.loadingSpinnerService.hideSpinner('home-articles'))
    );

    this.tarArticles$ = this.tagPageChanged$.pipe(
      switchMap((pageParams: any) => {
        return pageParams
          ? this.articleService.getListArticles({
              ...pageParams,
              tag: this.selectedTag,
            })
          : this.articleService.getListArticles({ tag: this.selectedTag });
      }),
      catchError((err) => {
        this.loadingSpinnerService.hideSpinner('home-articles');
        console.log(err);
        return of({ articles: [], articlesCount: 0 });
      }),
      tap(() => this.loadingSpinnerService.hideSpinner('home-articles'))
    );
  }

  openGlobalView(): void {
    if (this.viewMode !== 'global') {
      this.selectedTag = '';
      this.viewMode = 'global';
      this.globalPageChanged$.next(null);
      this.loadingSpinnerService.showSpinner('home-articles');
    }
  }

  openFeedView(): void {
    if (this.viewMode !== 'feed') {
      this.selectedTag = '';
      this.viewMode = 'feed';
      this.feedPageChanged$.next(null);
      this.loadingSpinnerService.showSpinner('home-articles');
    }
  }

  openTagView(selectedTagName: string): void {
    if (
      this.viewMode !== 'tag' ||
      (this.viewMode === 'tag' && this.selectedTag !== selectedTagName)
    ) {
      this.selectedTag = selectedTagName;
      this.tagPageChanged$.next(null);
      this.loadingSpinnerService.showSpinner('home-articles');
    }

    if (this.viewMode !== 'tag') {
      this.viewMode = 'tag';
    }
  }

  getPageParams(e: any): void {
    const { limit, offset } = e;
    switch (e?.view) {
      case 'global':
        this.globalPageChanged$.next({ limit, offset });
        break;
      case 'feed':
        this.feedPageChanged$.next({ limit, offset });
        break;
      case 'tag':
        this.tagPageChanged$.next({ limit, offset });
        break;
      default:
        break;
    }

    this.loadingSpinnerService.showSpinner('home-articles');
  }
}
