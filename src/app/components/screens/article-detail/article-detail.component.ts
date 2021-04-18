import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ArticleService } from './../../../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleDetail: any = {};
  tagLists: any[] = [];
  follow: boolean;
  favorite: boolean;
  favoritesCount: number;
  commentLists: any[] = [];
  textComment: string = '';
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      let localUser = JSON.parse(localStorage.getItem('user'));
      this.userName = localUser.username;
    }

    this.route.params.subscribe((res) => {
      this.articleService.getArticleDetail(res.id).subscribe((article) => {
        this.articleDetail = article;
        this.tagLists = this.articleDetail.article.tagList;
        this.follow = this.articleDetail.article.author.following;
        this.favorite = this.articleDetail.article.favorited;
        this.favoritesCount = this.articleDetail.article.favoritesCount;
      });
      this.articleService.getComments(res.id).subscribe((comments) => {
        this.commentLists = comments.comments.reverse();
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
    this.articleService.unFavoriteArticle(slug).subscribe((res) => {
      // console.log(res);
    });
  }

  deleteArticle(slug, userName) {
    let confirmMessage = confirm(
      'Are you sure you want to delete the article?'
    );
    if (confirmMessage) {
      this.articleService.deteleArticle(slug).subscribe((res) => {
        this.router.navigate([`profile/${userName}`]);
      });
    } else {
      return;
    }
  }

  addComment(slug, textComment) {
    let bodyComment = {
      comment: {
        body: textComment,
      },
    };
    this.articleService.addComments(bodyComment, slug).subscribe((res) => {
      this.articleService.getComments(slug).subscribe((comments) => {
        this.commentLists = comments.comments.reverse();
        this.textComment = '';
      });
    });
  }

  deleteComment(slug, id) {
    let confirmMessage = confirm(
      'Are you sure you want to delete the comment?'
    );
    if (confirmMessage) {
      this.articleService.deteleComment(slug, id).subscribe((res) => {
        this.articleService.getComments(slug).subscribe((comments) => {
          this.commentLists = comments.comments.reverse();
        });
      });
    } else {
      return;
    }
  }
}
