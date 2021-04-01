import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input('btnContent') btnContent: string;
  @Input('invalidForm') invalidForm: boolean;

  constructor() {}

  ngOnInit(): void {}
}
