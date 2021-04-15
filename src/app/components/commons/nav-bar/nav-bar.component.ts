import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  showDropdown: boolean = false;
  username: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  openSpinner(timeLoad) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, timeLoad);
  }

  goToNewArticle(): void {
    this.router.navigateByUrl('/newArticle');
  }

  goToMyArticles(): void {
    this.username = this.authService.getUser().username;
    this.router.navigateByUrl(`/profile/${this.username}`);
  }

  logout(): void {
    this.authService.logout();
    // this.router.navigate(['..']);
  }

  logIn(): void {
    this.router.navigateByUrl('/login');
  }

  signUp(): void {
    this.router.navigateByUrl('/signup');
  }
}
