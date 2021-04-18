import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  editArticleForm: FormGroup;
  private slug: string = '';
  private tagList: string[] = [];
  // private articleDetails: any = {};
  isSuccess: boolean = false;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.editArticleForm = new FormGroup({
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

    this.slug = this.router.url.split('edit-article/')[1];
    this.articleService.getArticleDetail(this.slug).subscribe((res: any) => {
      // this.articleDetails = {
      //   ...res,
      // };
      // console.log(this.articleDetails);
      this.editArticleForm.setValue({
        title: res.article.title,
        description: res.article.description,
        body: res.article.body,
        tagList: res.article.tagList.join(', '),
      });
      // console.log(this.editArticleForm.value.tagList);
    });
  }

  updateArticle(): void {
    this.tagList = [...this.editArticleForm.value.tagList.split(', ')];
    this.articleService
      .editArticle(this.editArticleForm.value, this.slug)
      .subscribe(
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
