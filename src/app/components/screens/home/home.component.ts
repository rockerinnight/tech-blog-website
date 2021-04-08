import { ArticleService } from './../../../services/article.service';
import { SingleArticle } from './../../../_models/single-article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mode: string = 'myFeedMode';
  listTags: any[];
  // // data from api
  // clickedArticle: SingleArticle = {
  //   slug: 'how-to-train-your-dragon',
  //   title: 'How to train your dragon',
  //   description: 'Ever wonder how?',
  //   body: 'It takes a Jacobian',
  //   tagList: ['dragons', 'training'],
  //   createdAt: '2016-02-18T03:22:56.637Z',
  //   updatedAt: '2016-02-18T03:48:35.824Z',
  //   favorited: false,
  //   favoritesCount: 0,
  //   author: {
  //     username: 'jake',
  //     bio: 'I work at statefarm',
  //     image: 'https://i.stack.imgur.com/xHWG8.jpg',
  //     following: false,
  //   },
  // };
  // favoritesCount = this.clickedArticle.favoritesCount;
  // isFavorited = this.clickedArticle.favorited;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getTag().subscribe((res) => {
      this.listTags = res.tags.filter((ele) => {
        return !(ele === '');
      });
      // console.log(this.listTags);
    });
  }
  // getDataFromChild(dataFromChild): void {
  //   // update data to clickedArticle
  //   this.clickedArticle.favorited = dataFromChild.favorited;
  //   this.clickedArticle.favoritesCount = dataFromChild.favoritesCount;
  //   console.log(this.clickedArticle);
  //   // POST dataFromChild back to Server
  // }
  myFeedMode() {
    this.mode = 'myFeedMode';
  }
  myGlobalMode() {
    this.mode = 'myGlobalMode';
  }
}
