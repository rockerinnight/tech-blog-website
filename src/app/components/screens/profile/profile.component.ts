import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleService } from 'src/app/services/article.service';

import { Profile } from 'src/app/models/profile';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  onSelected: boolean = this.authService.isAuthenticated() ? true : false;
  selectedUser: string = '';
  currProfile: Profile;
  totalItems: number = 0;
  itemsPerPage: number = 6;
  userName: string = '';

  follow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      let localUser = JSON.parse(localStorage.getItem('user'));
      this.userName = localUser.username;
    }

    this.route.params.subscribe((res: any) => {
      this.selectedUser = res.id;
    });
    this.authService.getProfile(this.selectedUser).subscribe((res: any) => {
      this.currProfile = res;
    });
  }

  openSpinner(timeLoad) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, timeLoad);
  }

  switchTab(): void {
    this.onSelected = !this.onSelected;
    this.openSpinner(200);
  }

  logout(): void {
    this.authService.logout();
  }

  followed(userName) {
    this.follow = true;
    this.articleService.followUser(userName).subscribe((res) => {
      // console.log(res);
    });
  }

  unFollowed(userName) {
    this.follow = false;
    this.articleService.unFollowUser(userName).subscribe((res) => {
      // console.log(res);
    });
  }
}
