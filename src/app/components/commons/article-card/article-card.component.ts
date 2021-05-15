import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input('data') data: any;
  @Output('tagFromCard') selectedTag = new EventEmitter();
  tagLists: any[];
  favoritesCount: number;
  isFavorited: boolean;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.tagLists = this.data.tagList;
    this.isFavorited = this.data.favorited;
    this.favoritesCount = this.data.favoritesCount;
  }

  favoriteArticle(slug) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    } else {
      this.isFavorited = true;
      this.favoritesCount++;
      this.data.favorited = true;
      this.data.favoritesCount++;
      this.articleService.favoriteArticle(slug).subscribe((res) => {
        // ** It returns a Single Article
        // console.log(res);
      });
    }
  }

  unFavoriteArticle(slug) {
    this.isFavorited = false;
    this.favoritesCount--;
    this.data.favorited = false;
    this.data.favoritesCount--;
    this.articleService.unFavoriteArticle(slug).subscribe((res) => {
      // ** It returns a Single Article
      // console.log(res);
    });
  }

  sendTagFromCard(tagName: string) {
    this.selectedTag.emit(tagName);
  }
}
