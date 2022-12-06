import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { FavoriteService } from 'src/app/services/favorite.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { Article } from 'src/app/models//article.model';
import { SingleArticle } from 'src/app/models/single-article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() data: Article;

  constructor(
    private router: Router,
    private favoriteService: FavoriteService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {}

  favoriteArticle(slug: string): void {
    this.loadingSpinnerService.showSpinner(
      `article-favorite-${this.data.slug}`
    );
    this.favoriteService
      .favoriteArticle(slug)
      .pipe(take(1))
      .subscribe(
        (res: SingleArticle) => {
          if (res?.article) {
            this.data = res.article;
          }
          this.loadingSpinnerService.hideSpinner(
            `article-favorite-${this.data.slug}`
          );
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner(
            `article-favorite-${this.data.slug}`
          );
        }
      );
  }

  unFavoriteArticle(slug: string): void {
    this.loadingSpinnerService.showSpinner(
      `article-favorite-${this.data.slug}`
    );
    this.favoriteService
      .unFavoriteArticle(slug)
      .pipe(take(1))
      .subscribe(
        (res: SingleArticle) => {
          if (res?.article) {
            this.data = res.article;
          }
          this.loadingSpinnerService.hideSpinner(
            `article-favorite-${this.data.slug}`
          );
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner(
            `article-favorite-${this.data.slug}`
          );
        }
      );
  }

  selectTag(tagName: string): void {
    this.router.navigate(['/home'], { queryParams: { tag: tagName } });
  }
}
