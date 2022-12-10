import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { Page } from 'src/app/models/page-params.model';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss'],
})
export class MyArticlesComponent implements OnInit {
  @Input() data: Observable<Article[]>;
  @Output() pageParamsEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlePageChanged(pageParams: Page) {
    this.pageParamsEmitter.emit({ ...pageParams, view: 'user' });
  }
}
