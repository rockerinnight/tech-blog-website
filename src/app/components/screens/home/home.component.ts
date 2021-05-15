import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ArticleService } from './../../../services/article.service';
import { AuthService } from 'src/app/services/auth.service';

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
    public authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.articleService.getTag().subscribe((res) => {
      this.listTags = res.tags.filter((el) => {
        let str = JSON.stringify(el).replace(/\W/g, '');
        return !!str;
      });
    });
  }

  openSpinner(timeLoad) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, timeLoad);
  }

  myFeedMode() {
    this.mode = 'myFeedMode';
    this.openSpinner(300);
  }

  myGlobalMode() {
    this.mode = 'myGlobalMode';
    this.openSpinner(1000);
  }

  tagMode() {
    this.mode = 'tagMode';
    this.openSpinner(900);
  }

  openTagFeed(tag: string): void {
    this.mode = 'tagMode';
    this.selectedTag = tag;
    this.openSpinner(900);
  }

  getTagFromGlobalFeed(tagName: string) {
    console.log(tagName);
    this.openTagFeed(tagName);
  }
}
