import { AuthService } from './../../../_services/auth.service';
import { Profile } from './../../../models/profile';
import { MultiArticle } from './../../../_models/multi-article';
import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  onSelected: boolean = true;
  myArticles: MultiArticle = null;
  myProfile: Profile;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let username = this.router.url.split('profile/')[1];
    // console.log(username);
    this.profileService.getMyArticles(username).subscribe((res: any) => {
      this.myArticles = res;
      console.log(this.myArticles);
    });
    this.authService.getProfile(username).subscribe(
      // valid user -> route to that user's profile
      (res: any) => {
        this.myProfile = res.profile;
        console.log(this.myProfile);
      },
      // if error - user not in DB -> route to not-found-page
      (error) => {
        this.router.navigateByUrl('/page-not-found');
      }
    );
  }

  switchTab(tabName: string): void {
    this.onSelected = !this.onSelected;
  }

  logout(): void {
    this.authService.logout();
  }
}
