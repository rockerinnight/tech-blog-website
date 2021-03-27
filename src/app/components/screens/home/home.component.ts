import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  likeCount: number = 1;
  homeContent: string = null;

  constructor() {}

  ngOnInit(): void {
    this.homeContent = 'Login';
  }
}
