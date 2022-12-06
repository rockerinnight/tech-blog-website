import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ArticleService } from './../../../services/article.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { User } from 'src/app/models/user.model';
import { Article } from 'src/app/models/article.model';
import { Comment } from 'src/app/models/comment.model';
import { Profile } from 'src/app/models/profile.model';
import { MultiComments } from 'src/app/models/multi-comments.model';
import { SingleArticle } from 'src/app/models/single-article.model';
import { SingleComment } from 'src/app/models/single-comment.model';
import { SingleCommentDto } from 'src/app/models/single-comment-dto.model';

interface UserResponse {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string;
}

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  textComment = '';

  articleDetail$: Observable<Article>;
  comment$: Observable<Comment[]>;
  user$: Observable<UserResponse>;

  articleUpdater = new BehaviorSubject(null);
  commentUpdater = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private commentService: CommentService,
    private articleService: ArticleService,
    private profileService: ProfileService,
    private favoriteService: FavoriteService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingSpinnerService.showSpinner();
    const slug = this.route.snapshot.params?.slug;

    this.articleDetail$ = this.articleUpdater.pipe(
      switchMap(() =>
        this.articleService.getArticle(slug).pipe(
          catchError((err) => {
            this.router.navigateByUrl('/404');
            return of({});
          })
        )
      ),
      map((res: SingleArticle) => res.article),
      tap(() => {
        this.loadingSpinnerService.hideSpinner('follow');
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.comment$ = this.commentUpdater.pipe(
      switchMap(() =>
        this.commentService.getComments(slug).pipe(
          catchError((err) => {
            this.router.navigateByUrl('/404');
            return of({});
          })
        )
      ),
      map((res: MultiComments) => res.comments),
      tap(() => {
        this.loadingSpinnerService.hideSpinner('comment-list');
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.user$ = this.authService.getUser().pipe(
      catchError((err) => {
        // this.router.navigateByUrl('/404');
        return of({ user: { username: '' } });
      }),
      map((res: User) => res.user),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    combineLatest([this.articleDetail$, this.comment$, this.user$])
      .pipe(take(1))
      .subscribe(() => {
        this.loadingSpinnerService.hideSpinner();
      });
  }

  followUser(userName: string): void {
    this.loadingSpinnerService.showSpinner('follow');
    this.profileService
      .followUser(userName)
      .pipe(take(1))
      .subscribe(
        (res: Profile) => {
          if (res) {
            this.articleUpdater.next(null);
          }
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner('follow');
        }
      );
  }

  unFollowUser(userName: string): void {
    this.loadingSpinnerService.showSpinner('follow');
    this.profileService
      .unFollowUser(userName)
      .pipe(take(1))
      .subscribe(
        (res: Profile) => {
          if (res) {
            this.articleUpdater.next(null);
          }
        },
        (e) => {
          console.log(e);
          this.articleUpdater.next(null);
        }
      );
  }

  favoriteArticle(slug: string): void {
    this.loadingSpinnerService.showSpinner('article-favorite');
    this.favoriteService
      .favoriteArticle(slug)
      .pipe(take(1))
      .subscribe(
        (res: SingleArticle) => {
          if (res?.article) {
            this.articleUpdater.next(null);
          }
          this.loadingSpinnerService.hideSpinner('article-favorite');
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner('article-favorite');
        }
      );
  }

  unFavoriteArticle(slug: string): void {
    this.loadingSpinnerService.showSpinner('article-favorite');
    this.favoriteService
      .unFavoriteArticle(slug)
      .pipe(take(1))
      .subscribe(
        (res: SingleArticle) => {
          if (res?.article) {
            this.articleUpdater.next(null);
          }
          this.loadingSpinnerService.hideSpinner('article-favorite');
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner('article-favorite');
        }
      );
  }

  deleteArticle(slug: string, userName: string): void {
    const confirmMessage = confirm(
      'Are you sure you want to delete this article?'
    );
    if (confirmMessage) {
      this.articleService
        .deleteArticle(slug)
        .pipe(take(1))
        .subscribe((res: null) => {
          this.router.navigate([`profile/${userName}`]);
        });
    }
  }

  addComment(slug: string, textComment: string): void {
    this.loadingSpinnerService.showSpinner('comment-input');
    this.loadingSpinnerService.showSpinner('comment-list');

    const reqBody: SingleCommentDto = { comment: { body: textComment } };

    this.commentService
      .addComment(slug, reqBody)
      .pipe(take(1))
      .subscribe(
        (res: SingleComment) => {
          this.textComment = '';
          this.commentUpdater.next(null);
          this.loadingSpinnerService.hideSpinner('comment-input');
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner('comment-input');
          this.loadingSpinnerService.hideSpinner('comment-list');
        }
      );
  }

  deleteComment(slug: string, id: number): void {
    const confirmMessage = confirm(
      'Are you sure you want to delete this comment?'
    );

    if (confirmMessage) {
      this.loadingSpinnerService.showSpinner('comment-list');

      this.commentService
        .deleteComment(slug, id)
        .pipe(take(1))
        .subscribe((res: null) => {
          this.commentUpdater.next(null);
        });
    }
  }

  selectTag(tagName: string): void {
    this.router.navigate(['/home'], { queryParams: { tag: tagName } });
  }
}
