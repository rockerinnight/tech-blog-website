import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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

  switchTab(): void {
    this.onSelected = !this.onSelected;
  }

  logout(): void {
    this.authService.logout();
  }
}
