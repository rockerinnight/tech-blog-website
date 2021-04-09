import { ArticleService } from './../../../services/article.service';
import { SingleArticle } from './../../../_models/single-article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mode: string = 'myFeedMode';
  listTags: any[];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getTag().subscribe((res) => {
      this.listTags = res.tags.filter((ele) => {
        return !(ele === '');
      });
    });
  }

  myFeedMode() {
    this.mode = 'myFeedMode';
  }
  myGlobalMode() {
    this.mode = 'myGlobalMode';
  }
}
