import { Profile } from './../../../_models/profile';
import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public profileData: Profile = null;
  constructor() {}

  ngOnInit(): void {
    // GET data from Server
    this.profileData = {
      username: 'jake',
      bio: 'I work at statefarm',
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      following: false,
    };
  }

  updateSettings(): void {
    // update new Settings to Server
  }
}
