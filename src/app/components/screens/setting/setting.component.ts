import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SettingService } from 'src/app/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  mySetting: any = [];
  constructor(private settingService: SettingService) {}

  ngOnInit(): void {}
}
