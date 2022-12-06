import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { TagService } from 'src/app/services/tag.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { Tags } from 'src/app/models/tag.model';
import { Article } from 'src/app/models/article.model';
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
  feedArticles$: Observable<Article[]>;
  tarArticles$: Observable<Article[]>;

  tagUpdater$ = new BehaviorSubject(null);

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

    this.tags$ = this.tagService.getTags().pipe(
      map((res: Tags) => res.tags),
      tap(() => this.loadingSpinnerService.hideSpinner('tag-list'))
    );

    this.globalArticles$ = this.articleService.pageChanged.pipe(
      switchMap((pageParams: any) => {
        console.log(pageParams);
        return pageParams
          ? this.articleService.getListArticles({
              limit: pageParams.limit,
              offset: pageParams.offset,
            })
          : this.articleService.getListArticles();
      }),
      catchError((err) => {
        this.loadingSpinnerService.hideSpinner('home-articles');
        console.log(err);
        return of({ articles: [], articlesCount: 0 });
      }),
      tap(() => this.loadingSpinnerService.hideSpinner('home-articles'))
    );

    this.feedArticles$ = this.articleService.getFeedArticles().pipe(
      map((res: MultiArticles) => res.articles),
      tap(() => this.loadingSpinnerService.hideSpinner('home-articles'))
    );

    this.tarArticles$ = this.tagUpdater$.pipe(
      switchMap((tagName: string) =>
        this.articleService.getListArticles({ tag: tagName })
      ),
      map((res: MultiArticles) => res.articles),
      tap(() => this.loadingSpinnerService.hideSpinner('home-articles'))
    );

    this.route.queryParams.subscribe((res: any) => {
      if (res?.tag?.length) {
        this.openTagView(res.tag);
      }
    });
  }

  openGlobalView(): void {
    this.viewMode = 'global';
    this.loadingSpinnerService.showSpinner('home-articles');
  }

  openFeedView(): void {
    this.viewMode = 'feed';
    this.loadingSpinnerService.showSpinner('home-articles');
  }

  openTagView(selectedTagName: string): void {
    this.viewMode = 'tag';
    this.selectedTag = selectedTagName;
    this.tagUpdater$.next(selectedTagName);
    this.loadingSpinnerService.showSpinner('home-articles');
  }

  onPageChanged(e: any): void {
    console.log(e);
  }
}
