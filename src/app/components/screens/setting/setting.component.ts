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
  // public profileData: Profile = null;
  CurrentUser;
  constructor(
    private settingsService: SettingsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // GET data from Server
    // this.profileData = {
    //   username: 'jake',
    //   bio: 'I work at statefarm',
    //   image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
    //   following: false,
    // };
    this.settingsService.getSettings().subscribe((res) => {
      console.log(res);
    });
  }

  updateSettings(): void {
    // update new Settings to Server
  }
}
