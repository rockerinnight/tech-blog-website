import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input('totalItems') totalItems: number = 0;
  @Input('itemPerpage') itemsPerpage: number = 0;
  @Output('onPageChange')
  onPagesChange: EventEmitter<number> = new EventEmitter();

  totalPages: number = 0;
  pages: any[] = [];
  selectedPage: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerpage);
    if (this.totalPages > 0) {
      if (this.totalPages === 1) {
        this.pages = [0];
      } else if (this.totalPages === 2) {
        this.pages = [0, 1];
      } else {
        this.pages = [0, 1, 2];
      }
    } else {
      this.pages = [];
    }
  }

  goToFirstPage() {
    this.selectedPage = 0;
    this.onPagesChange.emit(0);
    this.disablePreviousButton();
    this.pages = [0, 1, 2];
  }

  goToPage(page: number): void {
    if (page === this.selectedPage) {
      return;
    }
    this.selectedPage = page;
    this.onPagesChange.emit(page);
    if (page === this.pages[this.pages.length - 1]) {
      this.next();
    }
    if (page === this.pages[this.pages.length - 3]) {
      this.previous();
    }
  }

  goToLastPage() {

    this.selectedPage = this.totalPages - 1;
    this.onPagesChange.emit(this.totalPages);
    this.disablePreviousButton();
    this.pages = [
      this.totalPages - 3,
      this.totalPages - 2,
      this.totalPages - 1,
    ];
  }

  next(): void {
    if (!this.disableNextButton()) {
      this.pages = this.pages.map((page) => {
        return page + 1;
      });
    }
  }

  disableNextButton(): boolean {
    return (
      this.pages.length <= 2 ||
      this.pages[this.pages.length - 1] >= this.totalPages - 1 ||
      this.selectedPage - this.totalPages === 0
    );
  }

  previous(): void {
    if (this.pages[0] > 0) {
      this.pages = this.pages.map((page) => {
        return page - 1;
      });
    }
  }

  disablePreviousButton(): boolean {
    return (
      this.pages.length === 0 || this.pages[0] === 0 || this.selectedPage === 1
    );
  }
}
