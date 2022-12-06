import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

interface PagingParams {
  limit: number;
  offset: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number;
  @Input() itemsPerPage = 10;
  @Output() onPageChange = new EventEmitter<PagingParams>();

  isEmpty = false;
  isOverflowedPrev = false;
  isOverflowedNext = false;

  pages: Number[] = [];
  totalPages = 0;
  selectedPage = 0;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    //TODO if new value is changing the totalPages
    if (
      changes?.totalItems?.currentValue !== changes?.totalItems?.previousValue
    ) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      this.isEmpty = !changes?.totalItems?.currentValue;

      if (!this.totalPages) {
        this.pages = [];
        this.isOverflowedNext = false;
        return;
      }

      for (let i = 0; i < this.totalPages; i++) {
        this.pages.push(i);
      }
      if (this.pages.length > 10) {
        this.pages.length = 10;
        this.isOverflowedNext = true;
      }
    }
  }

  goToFirstPage(): void {
    if (this.selectedPage === 0) {
      return;
    }
    this.selectedPage = 0;
    this.onPageChange.emit({ limit: this.itemsPerPage, offset: 0 });
    this.isOverflowedPrev = false;
    this.isOverflowedNext = true;
  }

  goToLastPage(): void {
    if (this.selectedPage === this.totalPages - 1) {
      return;
    }
    this.selectedPage = this.totalPages - 1;
    this.onPageChange.emit({
      limit: this.itemsPerPage,
      offset: (this.totalPages - 1) * this.itemsPerPage,
    });
    this.isOverflowedPrev = true;
    this.isOverflowedNext = false;
  }

  goToPage(index: number): void {
    if (index === this.selectedPage) {
      return;
    }

    this.selectedPage = index;
    this.articleService.pageChanged.next({
      limit: 1,
      offset: index * this.itemsPerPage,
    });
  }

  goToNextPage(): void {
    if (this.selectedPage + 1 >= this.totalPages) {
      return;
    }
    if (this.selectedPage + 1 === this.pages.length) {
      this.pages.length = 0;
      for (let i = this.selectedPage + 1; i < this.totalPages; i++) {
        this.pages.push(i);
      }
      if (this.pages.length > 10) {
        this.pages.length = 10;
        this.isOverflowedPrev = true;
        this.isOverflowedNext = true;
      }
    }
    this.selectedPage++;
    this.onPageChange.emit({
      limit: this.itemsPerPage,
      offset: this.selectedPage * this.itemsPerPage,
    });
  }

  goToPreviousPage(): void {
    if (this.selectedPage - 1 < 0) {
      return;
    }
    this.selectedPage--;
    this.onPageChange.emit({
      limit: this.itemsPerPage,
      offset: this.selectedPage * this.itemsPerPage,
    });
  }

  // openOverflow(place: 'prev' | 'next'): void {
  //   if (!this.totalPages) {
  //     this.pages = [];
  //     this.isOverflowed = false;
  //     return;
  //   }

  //   for (let i = 0; i < this.totalPages; i++) {
  //     this.pages.push(i);
  //   }
  //   if (this.pages.length > 10) {
  //     this.pages.length = 10;
  //     this.isOverflowed = true;
  //   }
  // }
}
