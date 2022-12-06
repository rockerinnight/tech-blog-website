import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss'],
})
export class MyArticlesComponent implements OnInit {
  @Input() data: Observable<Article[]>;

  constructor() {}

  ngOnInit(): void {}

  handlePageChange(page: number) {}
}
