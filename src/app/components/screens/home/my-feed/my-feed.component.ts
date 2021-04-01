import { Component, OnInit } from '@angular/core';
import { ArticleService } from './../../../../services/article.service';

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.scss'],
})
export class MyFeedComponent implements OnInit {
  myFeeds: any = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getMyFeed().subscribe((res) => {
      this.myFeeds = res.articles;
    });
  }
}
