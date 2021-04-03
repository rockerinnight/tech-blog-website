import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleArticle } from 'src/app/_models/single-article';
import { ArticleService } from './../../../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleDetail: any = {};

  constructor(
    private router: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.articleService.getArticleDetail(res.id).subscribe((article) => {
        this.articleDetail = article;
        console.log(this.articleDetail);
      });
    });
  }
}
