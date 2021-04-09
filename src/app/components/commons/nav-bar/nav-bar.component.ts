import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  username: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.isAuthenticated()
      ? this.authService.getUser()?.username
      : '';
  }

  logout(): void {
    this.authService.logout();
  }
}
