import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  // fixed: have never click it before
  isActivated: boolean = false;
  @Input('childContent') childContent: string = null;

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.isActivated = !this.isActivated;
    // implement what this button does
  }
}
