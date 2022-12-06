import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MultiArticles } from 'src/app/models/multi-articles.model';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  @Input() data: Observable<MultiArticles>;

  constructor() {}

  ngOnInit(): void {}
}
