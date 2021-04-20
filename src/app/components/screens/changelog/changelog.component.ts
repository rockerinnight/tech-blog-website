import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit {
  currDate: Date = new Date();
  writeDate: string = '';
  constructor() {}

  ngOnInit(): void {
    this.writeDate = this.currDate.toString();
  }

  getCurrDate() {
    return this.writeDate;
  }
}
