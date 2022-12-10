import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Page } from 'src/app/models/page-params.model';
import { MultiArticles } from 'src/app/models/multi-articles.model';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  @Input() data: Observable<MultiArticles>;
  @Output() pageParamsEmitter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handlePageChanged(pageParams: Page) {
    this.pageParamsEmitter.emit({ ...pageParams, view: 'global' });
  }
}
