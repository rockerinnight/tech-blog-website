import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.scss'],
})
export class MyFeedComponent implements OnInit {
  myFeeds: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getMyFeed(0, this.itemsPerPage);
  }

  getMyFeed(skip: number, top: number) {
    this.articleService.getMyFeed(skip, top).subscribe((res) => {
      this.myFeeds = res.articles;
      this.totalItems = res.articlesCount;
    });
  }

  handlePageChange(page: number) {
    this.getMyFeed(page, this.itemsPerPage);
  }
}
