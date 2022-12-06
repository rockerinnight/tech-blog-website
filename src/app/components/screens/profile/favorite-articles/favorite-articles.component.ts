import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.scss'],
})
export class FavoriteArticlesComponent implements OnInit {
  @Input() data: Observable<Article[]>;

  constructor() {}

  ngOnInit(): void {}

  handlePageChange(page: number) {}
}
