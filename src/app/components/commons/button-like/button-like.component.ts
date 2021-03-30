import { SingleArticle } from './../../../_models/single-article';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-button-like',
  templateUrl: './button-like.component.html',
  styleUrls: ['./button-like.component.scss'],
})
export class ButtonLikeComponent implements OnInit {
  // data from parent
  @Input('isFavorited') isFavorited: boolean;
  @Input('favoritesCount') favoritesCount: number;
  @Output('dataFromChild') dataFromChild = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  clickHandler(): void {
    if (this.isFavorited) {
      this.favoritesCount -= 1;
    } else {
      this.favoritesCount += 1;
    }
    this.isFavorited = !this.isFavorited;
    this.dataFromChild.emit({
      favorited: this.isFavorited,
      favoritesCount: this.favoritesCount,
    });
  }
}
