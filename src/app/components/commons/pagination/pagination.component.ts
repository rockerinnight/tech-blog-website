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
  isEmpty: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.isEmpty = this.totalItems ? false : true;
  }

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
    this.selectedPage = this.totalPages;
    this.onPagesChange.emit(this.totalPages);

    this.disableNextButton();
  }

  next(): void {
    if (!this.disableNextButton()) {
      this.pages = this.pages.map((page) => {
        return page + 2;
      });
    }
  }

  disableNextButton(): boolean {
    return (
      this.pages.length === 0 ||
      this.pages[this.pages.length - 1] >= this.totalPages - 1 ||
      this.selectedPage - this.totalPages === 0
    );
  }

  previous(): void {
    if (this.pages[0] > 0) {
      this.pages = this.pages.map((page) => {
        return page - 2;
      });
    }
  }

  disablePreviousButton(): boolean {
    return this.pages.length === 0 || this.pages[0] === 0;
  }
}
