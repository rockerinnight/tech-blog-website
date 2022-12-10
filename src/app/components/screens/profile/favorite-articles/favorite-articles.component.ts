import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { Page } from 'src/app/models/page-params.model';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.scss'],
})
export class FavoriteArticlesComponent implements OnInit {
  @Input() data: Observable<Article[]>;
  @Output() pageParamsEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlePageChanged(pageParams: Page) {
    this.pageParamsEmitter.emit({ ...pageParams, view: 'favorited' });
  }
}
