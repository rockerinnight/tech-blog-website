import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  @Input() data: Observable<Article[]>;

  constructor() {}

  ngOnInit(): void {}

  handlePageChange(page: number) {}
}
