import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  newArticleForm: FormGroup;
  slug: string;
  tagList: string[] = [];
  isSuccess: boolean = false;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.newArticleForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      body: new FormControl('', [Validators.required, Validators.minLength(1)]),
      tagList: new FormControl(''),
    });
  }

  publishArticle(): void {
    this.tagList = [...this.newArticleForm.value.tagList.split(', ')];
    // console.log(this.tagList);

    this.newArticleForm.patchValue({
      tagList: this.tagList,
    });
    // console.log(this.newArticleForm.value);

    this.articleService.publishArticle(this.newArticleForm.value).subscribe(
      (res: any) => {
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigateByUrl(
            // `/profile/${this.authService.getUser().username}`
            `/articles/${res.article.slug}`
          );
        }, 2000);
      },
      (err: any) => {
        console.log(err);
        window.location.reload();
      }
    );
  }
}
