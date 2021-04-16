import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { SingleArticle } from './../../../models/single-article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input('data') data: SingleArticle;
  tagLists: any[];
  favoritesCount: number;
  isFavorited: boolean;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.tagLists = this.data.tagList;
    this.isFavorited = this.data.favorited;
    this.favoritesCount = this.data.favoritesCount;
  }

  favoriteArticle(slug) {
    this.isFavorited = true;
    this.favoritesCount++;
    this.data.favorited = true;
    this.data.favoritesCount++;
    this.articleService.favoriteArticle(slug).subscribe((res) => {
      // console.log(res);
    });
  }

  unFavoriteArticle(slug) {
    this.isFavorited = false;
    this.favoritesCount--;
    this.data.favorited = false;
    this.data.favoritesCount--;
    this.articleService.unFavoriteArticle(slug).subscribe((res) => {
      // console.log(res);
    });
  }
}
