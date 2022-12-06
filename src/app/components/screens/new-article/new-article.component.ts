import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { map, take } from 'rxjs/operators';

import { ArticleService } from 'src/app/services/article.service';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

import { Article } from 'src/app/models/article.model';
import { SingleArticle } from 'src/app/models/single-article.model';
import { SingleArticleCreateDto } from 'src/app/models/single-article-create-dto.model';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  newArticleForm: FormGroup;

  onEditing = false;

  savedDraft = false;
  isPublished = false;
  errorOccurs: { status: boolean; msg: string } = { status: false, msg: '' };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.newArticleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      body: ['', [Validators.required, Validators.minLength(1)]],
      tagList: this.fb.array([]),
    });

    const slug = this.route.snapshot.params?.slug;
    //* On edit
    if (slug?.length) {
      this.loadingSpinnerService.showSpinner('new-articles');
      this.onEditing = true;

      this.articleService
        .getArticle(slug)
        .pipe(
          take(1),
          map((res: SingleArticle) => res.article)
        )
        .subscribe((res: Article) => {
          const { title = '', description = '', body = '', tagList = [] } = res;
          this.newArticleForm.patchValue({ title, description, body });
          if (tagList.length) {
            tagList.forEach((tag: string) => {
              this.tagListForm.push(this.fb.control(tag));
            });
          }

          this.loadingSpinnerService.hideSpinner('new-articles');
        });
    }
    //* On draft loading if exists
    else {
      const localDraft = localStorage.getItem('draft');
      if (localStorage.getItem('draft')) {
        this.loadingSpinnerService.showSpinner('new-articles');
        const {
          title = '',
          description = '',
          body = '',
          tagList = [],
        } = JSON.parse(localDraft);

        this.newArticleForm.patchValue({
          title,
          description,
          body,
        });

        if (tagList.length) {
          tagList.forEach((tag: string) => {
            this.tagListForm.push(this.fb.control(tag));
          });
        }

        this.loadingSpinnerService.hideSpinner('new-articles');
      }
    }
  }

  get tagListForm(): FormArray {
    return this.newArticleForm.get('tagList') as FormArray;
  }

  addTag(e: any): void {
    this.tagListForm.push(this.fb.control(e.target.value));
    e.target.value = '';
  }

  removeTag(index: number): void {
    this.tagListForm.removeAt(index);
  }

  createArticle(): void {
    this.loadingSpinnerService.showSpinner('new-articles');
    this.newArticleForm.markAllAsTouched();

    if (this.newArticleForm.invalid) {
      this.loadingSpinnerService.hideSpinner('new-articles');
      return;
    }

    const { title, description, body, tagList } = this.newArticleForm.value;

    const reqBody: SingleArticleCreateDto = {
      article: { title, description, body, tagList },
    };
    this.articleService
      .createArticle(reqBody)
      .pipe(take(1))
      .subscribe(
        (res: SingleArticle) => {
          this.loadingSpinnerService.hideSpinner('new-articles');

          this.savedDraft = false;
          this.errorOccurs = { status: false, msg: '' };
          this.isPublished = true;
          this.router.navigateByUrl(`/articles/${res.article.slug}`);
        },
        (e: any) => {
          this.loadingSpinnerService.hideSpinner('new-articles');

          this.errorOccurs = { status: true, msg: '' };
          const errorList = e?.error?.errors;
          if (errorList?.title?.length) {
            if (errorList.title[0] === 'must be unique') {
              this.errorOccurs.msg = 'The title is existed. It must be unique.';
            }
          }
          this.savedDraft = false;
          this.isPublished = false;
          console.log(e);
        }
      );
  }

  saveDraftArticle(): void {
    this.savedDraft = true;
    this.isPublished = false;
    this.errorOccurs = { status: false, msg: '' };
    localStorage.setItem('draft', JSON.stringify(this.newArticleForm.value));
  }
}
