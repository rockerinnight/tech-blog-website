import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  showDropdown = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {}

  goToNewArticle(): void {
    this.router.navigateByUrl('/new-article');
  }

  goToMyArticles(): void {
    this.loadingSpinnerService.showSpinner();
    this.authService
      .getUser()
      .pipe(take(1))
      .subscribe((res: User) => {
        this.loadingSpinnerService.hideSpinner();
        if (!res?.user?.username) {
          this.router.navigateByUrl(`/home`);
          return;
        }
        const userName = res.user.username;
        this.router.navigateByUrl(`/profile/${userName}`);
      });
  }

  signUp(): void {
    this.router.navigateByUrl('/register');
  }

  logIn(): void {
    this.router.navigateByUrl('/login');
  }

  logout(): void {
    this.showDropdown = false;
    this.authService.logout();
  }
}
