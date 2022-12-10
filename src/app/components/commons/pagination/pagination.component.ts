import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Page } from 'src/app/models/page-params.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Output() pageChanged = new EventEmitter();

  isEmpty = false;

  idxToNext = 4;
  idxToPrev = 2;
  maxLenPages = 7;
  selectedLabel = 1;

  totalPages = 0;
  pages: Page[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.totalItems?.currentValue !== changes?.totalItems?.previousValue
    ) {
      this.isEmpty = !changes?.totalItems?.currentValue;
      this.totalItems = changes?.totalItems?.currentValue;

      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      this.pages.length = 0;
      for (let i = 0; i < this.totalPages; i++) {
        this.pages.push({ label: i + 1, idx: i });
      }

      this.pages = this.pages.filter((p) => p.label >= 1);

      if (this.pages.length > this.maxLenPages) {
        this.pages.length = this.maxLenPages;
      }

      this.selectedLabel = 1;
    }
  }

  trackByLabel(index: number, item: Page): any {
    return item.label;
  }

  goToFirstPage(): void {
    if (this.checkResetPages('first')) {
      this.resetPages('first');
    }
    this.fetch('first');
  }

  goToLastPage(): void {
    if (this.checkResetPages('last')) {
      this.resetPages('last');
    }
    this.fetch('last');
  }

  goToNextPage(): void {
    if (this.checkResetPages('next')) {
      this.resetPages('next');
    }
    this.fetch('next');
  }

  goToPrevPage(): void {
    if (this.checkResetPages('prev')) {
      this.resetPages('prev');
    }
    this.fetch('prev');
  }

  goToPage(page: Page): void {
    if (this.checkResetPages(page)) {
      this.resetPages(page);
    }
    this.fetch(page);
  }

  private checkResetPages(action: string | Page): boolean {
    switch (action) {
      case 'first':
        return this.pages[0].label > 1;

      case 'last':
        return this.pages[0].label < this.totalPages;

      case 'next':
        return (
          this.selectedLabel ===
            this.pages[this.pages.length - 1 - (this.idxToNext - 1)]?.label &&
          this.pages[this.pages.length - 1].label < this.totalPages
        );

      case 'prev':
        return (
          this.selectedLabel === this.pages[0 + (this.idxToPrev + 1)]?.label &&
          this.pages[0].label > 1
        );

      default:
        if (action instanceof Object) {
          return (
            this.selectedLabel !== action.label &&
            (action.label <= this.pages[this.idxToPrev]?.label ||
              action.label >= this.pages[this.idxToNext]?.label)
          );
        }
        return false;
    }
  }

  private resetPages(action: string | Page): void {
    let i = 0;
    switch (action) {
      case 'first':
        i = 0;
        break;

      case 'last':
        i = this.totalPages - 1 - (this.maxLenPages - 1) + 1;
        break;

      case 'next':
        i = this.pages[this.pages.length - 1].idx - (this.maxLenPages - 1) + 1;
        break;

      case 'prev':
        i = this.pages[0].idx - 1;
        break;

      default:
        if (action instanceof Object) {
          i = action.idx - 3 > 0 ? action.idx - 3 : 0;
        }
        break;
    }

    this.pages.length = 0;
    for (i; i < this.totalPages; i++) {
      this.pages.push({ label: i + 1, idx: i });
    }

    this.pages = this.pages.filter((p) => p.label >= 1);

    if (this.pages.length > this.maxLenPages) {
      this.pages.length = this.maxLenPages;
    }
  }

  private fetch(action: string | Page): void {
    if (this.selectedLabel > this.totalPages) {
      return;
    }

    switch (action) {
      case 'first':
        this.selectedLabel = 1;
        break;

      case 'last':
        this.selectedLabel = this.totalPages;
        break;

      case 'next':
        this.selectedLabel++;
        break;

      case 'prev':
        this.selectedLabel--;
        break;

      default:
        if (action instanceof Object) {
          this.selectedLabel = action.label;
        }
        break;
    }

    this.pageChanged.emit({
      limit: this.itemsPerPage,
      offset: (this.selectedLabel - 1) * this.itemsPerPage,
    });
  }
}
