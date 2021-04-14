import { Profile } from './../../../_models/profile';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public profileData: Profile = null;

  constructor(
    private settingsService: SettingsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // GET data from Server
    this.profileData = {
      profile: {
        username: 'jake',
        bio: 'I work at statefarm',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
    };
  }

  updateSettings(): void {
    // update new Settings to Server
  }
}
