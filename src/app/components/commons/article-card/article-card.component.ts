import { Component, Input, OnInit } from '@angular/core';
import { SingleArticle } from './../../../models/single-article';
import { ArticleService } from 'src/app/services/article.service';

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
    this.favoritesCount = this.data.favoritesCount;
    this.isFavorited = this.data.favorited;
  }

  getDataFromChild(dataFromChild): void {
    // update data to clickedArticle
    this.data.favorited = dataFromChild.favorited;
    this.data.favoritesCount = dataFromChild.favoritesCount;
    // POST dataFromChild back to Server
  }
}
