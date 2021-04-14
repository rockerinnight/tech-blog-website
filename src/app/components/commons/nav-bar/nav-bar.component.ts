import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  showDropdown: boolean = false;
  username: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  goToNewArticle(): void {
    this.router.navigateByUrl('/newArticle');
  }

  goToMyArticles(): void {
    this.username = this.authService.isAuthenticated()
      ? this.authService.getUser()?.username
      : '';
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
