import { ArticleService } from './../../../services/article.service';
import { SingleArticle } from './../../../_models/single-article';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mode: string = this.authService.isAuthenticated()
    ? 'myFeedMode'
    : 'myGlobalMode';
  listTags: any[];
  selectedTag: string = '';

  constructor(
    private articleService: ArticleService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.articleService.getTag().subscribe((res) => {
      this.listTags = res.tags.filter((el) => {
        let str = JSON.stringify(el).replace(/\W/g, '');
        return !!str;
      });
    });
  }

  myFeedMode() {
    this.mode = 'myFeedMode';
  }

  myGlobalMode() {
    this.mode = 'myGlobalMode';
  }

  tagMode() {
    this.mode = 'tagMode';
  }

  openTagFeed(tag: string): void {
    this.mode = 'tagMode';
    this.selectedTag = tag;
  }
}
