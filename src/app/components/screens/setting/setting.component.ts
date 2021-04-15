import { Profile } from './../../../_models/profile';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public profileData: Profile = null;
  CurrentUser;
  constructor(
    private settingsService: SettingsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let username = this.router.url.split('profile/')[1];
    // GET data from Server
    this.profileData = {
      profile: {
        username: 'jake',
        bio: 'I work at statefarm',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
    };
    this.auth.getProfile(username).subscribe((res: any) => {
      console.log(res);
    });
  }

  updateSettings(): void {
    // update new Settings to Server
    this.router.navigate(['/profile']);
  }
}
