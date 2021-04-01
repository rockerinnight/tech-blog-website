import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  globalFeeds: any = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getGlobalFeed().subscribe((res) => {
      this.globalFeeds = res.articles;
    });
  }
}
