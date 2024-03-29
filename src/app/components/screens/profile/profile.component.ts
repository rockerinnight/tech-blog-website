import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';
import { ProfileService } from 'src/app/services/profile.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { User } from 'src/app/models/user.model';
import { Author } from 'src/app/models/author.model';
import { Profile } from 'src/app/models/profile.model';
import { MultiArticles } from 'src/app/models/multi-articles.model';

interface UserResponse {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  viewMode: 'user' | 'favorited' = 'user';

  profile$: Observable<Author>;
  user$: Observable<UserResponse>;
  userArticles$: Observable<MultiArticles>;
  favoritedArticles$: Observable<MultiArticles>;

  private profileUpdater$ = new BehaviorSubject(null);
  private userPageChanged$ = new BehaviorSubject(null);
  private favoritedPageChanged$ = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private profileService: ProfileService,
    private articleService: ArticleService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingSpinnerService.showSpinner('profile-info');
    this.loadingSpinnerService.showSpinner('profile-articles');

    const userName = this.route.snapshot.params?.username;

    this.profile$ = this.profileUpdater$.pipe(
      switchMap(() =>
        this.profileService.getProfile(userName).pipe(
          catchError((err) => {
            this.router.navigateByUrl('/404');
            return of({});
          })
        )
      ),
      map((res: Profile) => res.profile),
      tap(() => {
        this.loadingSpinnerService.hideSpinner('profile-articles');
        this.loadingSpinnerService.hideSpinner('follow');
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.user$ = of(this.authService.isAuthenticated())
      .pipe(
        switchMap((isAuth: boolean) =>
          !isAuth
            ? of({ user: { username: '' } })
            : this.authService.getUser().pipe(
                catchError((err) => {
                  this.router.navigateByUrl('/home');
                  return of({});
                })
              )
        )
      )
      .pipe(
        tap(() => {
          this.loadingSpinnerService.hideSpinner('profile-info');
        }),
        map((res: User) => res?.user),
        shareReplay({ bufferSize: 1, refCount: true })
      );

    this.userArticles$ = this.userPageChanged$.pipe(
      switchMap((pageParams: any) => {
        return pageParams
          ? this.articleService.getListArticles({
              ...pageParams,
              author: userName,
            })
          : this.articleService.getListArticles({
              author: userName,
            });
      }),
      catchError((err) => {
        this.loadingSpinnerService.hideSpinner('profile-articles');
        console.log(err);
        return of({ articles: [], articlesCount: 0 });
      }),
      tap(() => this.loadingSpinnerService.hideSpinner('profile-articles'))
    );

    this.favoritedArticles$ = this.favoritedPageChanged$.pipe(
      switchMap((pageParams: any) => {
        return pageParams
          ? this.articleService.getListArticles({
              ...pageParams,
              favorited: userName,
            })
          : this.articleService.getListArticles({
              favorited: userName,
            });
      }),
      catchError((err) => {
        this.loadingSpinnerService.hideSpinner('profile-articles');
        console.log(err);
        return of({ articles: [], articlesCount: 0 });
      }),
      tap(() => this.loadingSpinnerService.hideSpinner('profile-articles'))
    );
  }

  switchTab(mode: 'user' | 'favorited'): void {
    if (this.viewMode !== mode) {
      this.viewMode = mode;
      this.loadingSpinnerService.showSpinner('profile-articles');
    }
  }

  followUser(userName: string): void {
    this.loadingSpinnerService.showSpinner('follow');
    this.profileService
      .followUser(userName)
      .pipe(take(1))
      .subscribe(
        (res: Profile) => {
          if (res) {
            this.profileUpdater$.next(null);
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
            this.profileUpdater$.next(null);
          }
        },
        (e) => {
          console.log(e);
          this.loadingSpinnerService.hideSpinner('follow');
        }
      );
  }

  getPageParams(e: any): void {
    const { limit, offset } = e;
    switch (e?.view) {
      case 'user':
        this.userPageChanged$.next({ limit, offset });
        break;
      case 'favorited':
        this.favoritedPageChanged$.next({ limit, offset });
        break;
      default:
        break;
    }

    this.loadingSpinnerService.showSpinner('profile-articles');
  }
}
