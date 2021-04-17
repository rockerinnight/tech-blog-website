import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-new-ariticle',
  templateUrl: './new-ariticle.component.html',
  styleUrls: ['./new-ariticle.component.scss'],
})
export class NewAriticleComponent implements OnInit {
  newArticleForm: FormGroup;
  slug: string;
  tagList: string[] = [];
  isSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private ariticle: ArticleService,
    private router: Router
  ) {}

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
    this.tagList = [...this.newArticleForm.value.tagList.trim().split(',')];

    this.ariticle.publishArticle(this.newArticleForm.value).subscribe(
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
