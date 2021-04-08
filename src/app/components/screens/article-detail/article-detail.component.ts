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
  follow: boolean;
  favorite: boolean;
  favoritesCount: number;

  constructor(
    private router: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.articleService.getArticleDetail(res.id).subscribe((article) => {
        this.articleDetail = article;
        this.follow = this.articleDetail.article.author.following;
        this.favorite = this.articleDetail.article.favorited;
        this.favoritesCount = this.articleDetail.article.favoritesCount;
      });
    });
  }

  followed(userName) {
    this.follow = true;
    this.articleDetail.article.author.following = true;
    this.articleService.followUser(userName).subscribe((res) => {
      // console.log(res);
    });
  }

  unFollowed(userName) {
    this.follow = false;
    this.articleDetail.article.author.following = false;
    this.articleService.unFollowUser(userName).subscribe((res) => {
      // console.log(res);
    });
  }

  favoriteArticle(slug) {
    this.favorite = true;
    this.favoritesCount++;
    this.articleDetail.article.favorited = true;
    this.articleDetail.article.favoritesCount++;
    this.articleService.favoriteArticle(slug).subscribe((res) => {
      // console.log(res);
    });
  }

  unFavoriteArticle(slug) {
    this.favorite = false;
    this.favoritesCount--;
    this.articleDetail.article.favorited = false;
    this.articleDetail.article.favoritesCount--;
    this.articleService.favoriteArticle(slug).subscribe((res) => {
      // console.log(res);
    });
  }
}
