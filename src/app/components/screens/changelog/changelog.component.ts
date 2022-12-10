import { Component, OnInit } from '@angular/core';
import changeLogs from 'src/assets/changelogs.json';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit {
  data = null;
  constructor() {}

  ngOnInit(): void {
    this.data = changeLogs.data;
  }
}
