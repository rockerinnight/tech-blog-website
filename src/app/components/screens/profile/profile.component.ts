import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Profile } from 'src/app/_models/profile';
import { AuthService } from './../../../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  onSelected: boolean = this.authService.isAuthenticated() ? true : false;
  selectedUser: string = '';
  myProfile: Profile;
  totalItems: number = 0;
  itemsPerPage: number = 6;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    let localUser = JSON.parse(localStorage.getItem('user'));
    this.userName = localUser.username;

    this.route.params.subscribe((res: any) => {
      this.selectedUser = res.id;
    });
    this.authService.getProfile(this.selectedUser).subscribe((res: any) => {
      this.myProfile = res;
      this.myProfile.profile.image = this.myProfile.profile.image
        ? this.myProfile.profile.image
        : 'https://static.productionready.io/images/smiley-cyrus.jpg';
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
}
