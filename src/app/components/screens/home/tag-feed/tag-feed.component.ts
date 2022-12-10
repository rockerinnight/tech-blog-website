import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { Page } from 'src/app/models/page-params.model';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  @Input() data: Observable<Article[]>;
  @Output() pageParamsEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlePageChanged(pageParams: Page) {
    this.pageParamsEmitter.emit({ ...pageParams, view: 'tag' });
  }
}
