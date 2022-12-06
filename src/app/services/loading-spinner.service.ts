import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(name: string = 'primary'): void {
    this.spinner.show(name);
  }

  hideSpinner(name: string = 'primary'): void {
    this.spinner.hide(name);
  }
}
