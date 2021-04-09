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

  constructor(
    private articleService: ArticleService,
    public authService: AuthService
  ) {}

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
