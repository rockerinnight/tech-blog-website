import { SingleArticle } from './../../../models/single-article';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input('data') data: SingleArticle;

  constructor() {}

  ngOnInit(): void {}
}
