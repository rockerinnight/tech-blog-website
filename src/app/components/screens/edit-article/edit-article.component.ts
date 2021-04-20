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
  savedDraft: boolean = false;
  isUpdated: boolean = false;
  errorOccurs: boolean = false;
  draftArticle: any = {};

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

    // ** Check if there is any draft saved in LS
    let localDraft = localStorage.getItem(`draft-${this.slug}`);
    if (localDraft) {
      this.draftArticle = JSON.parse(localDraft);

      // ** Load content from LS
      this.editArticleForm.setValue({
        title: this.draftArticle.title,
        description: this.draftArticle.description,
        body: this.draftArticle.body,
        tagList: this.draftArticle.tagList,
      });
    } else {
      // ** Load content from Server
      this.articleService.getArticleDetail(this.slug).subscribe((res: any) => {
        this.editArticleForm.setValue({
          title: res.article.title,
          description: res.article.description,
          body: res.article.body,
          tagList: res.article.tagList.join(', '),
        });
      });
    }
  }

  updateArticle(): void {
    // console.log(this.editArticleForm.value);

    this.articleService
      .editArticle(this.editArticleForm.value, this.slug)
      .subscribe(
        (res: any) => {
          // ** patch value of tagList after 'arraying' it
          let tagList: string[] = [
            ...this.editArticleForm.value.tagList.split(', '),
          ];
          // console.log(tagList);
          this.editArticleForm.patchValue({
            tagList: tagList,
          });
          this.savedDraft = false;
          this.errorOccurs = false;
          this.isUpdated = true;
          setTimeout(() => {
            // ** If publishing successfully, delete draft from LS
            localStorage.removeItem(`draft-${this.slug}`);
            this.router.navigateByUrl(
              // ! User this router if you want to navigate back to profile instead
              // `/profile/${this.authService.getUser().username}`
              `/articles/${res.article.slug}`
            );
          }, 2000);
        },
        (err: any) => {
          console.log(err);
          this.savedDraft = false;
          this.errorOccurs = true;
          this.isUpdated = false;
        }
      );
  }

  saveDraftArticle() {
    this.savedDraft = true;
    this.errorOccurs = false;
    this.isUpdated = false;
    localStorage.setItem(
      `draft-${this.slug}`,
      JSON.stringify(this.editArticleForm.value)
    );
  }
}
