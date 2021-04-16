import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  globalFeeds: any = [];
  totalItems: number = 0;
  itemsPerPage: number = 6;
  loadDone: boolean = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getGlobalFeed(0, this.itemsPerPage);
  }

  getGlobalFeed(skip: number, top: number) {
    this.articleService.getGlobalFeed(skip, top).subscribe((res) => {
      this.globalFeeds = res.articles;
      this.totalItems = res.articlesCount;
      this.loadDone = true;
    });
  }

  handlePageChange(page: number) {
    this.getGlobalFeed(page, this.itemsPerPage);
  }
}
