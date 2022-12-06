import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.scss'],
})
export class MyFeedComponent implements OnInit {
  @Input() data: Observable<Article[]>;

  constructor() {}

  ngOnInit(): void {}

  handlePageChange(page: number) {}
}
