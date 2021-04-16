import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { MultiArticle } from 'src/app/_models/multi-article';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.scss'],
})
export class FavoriteArticlesComponent implements OnInit {
  @Input('selectedUser') selectedUser: string;
  favoritedArticles: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getFavoriteArticles(this.selectedUser, 0, this.itemsPerPage);
  }

  getFavoriteArticles(username: string, skip: number, top: number) {
    this.articleService
      .getFavoriteArticles(username, skip, top)
      .subscribe((res: MultiArticle) => {
        this.favoritedArticles = res.articles;
        this.totalItems = res.articlesCount;
        this.loadDone = true;
      });
  }

  handlePageChange(page: number) {
    this.getFavoriteArticles(this.selectedUser, page, this.itemsPerPage);
  }
}
