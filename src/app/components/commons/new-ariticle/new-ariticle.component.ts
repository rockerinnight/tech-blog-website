import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { SingleArticle } from 'src/app/_models/single-article';

@Component({
  selector: 'app-new-ariticle',
  templateUrl: './new-ariticle.component.html',
  styleUrls: ['./new-ariticle.component.scss'],
})
export class NewAriticleComponent implements OnInit {
  form: FormGroup;
  value = '';
  isSubmitting = false;

  slug: string;
  tagList: string[] = [];
  constructor(
    private fb: FormBuilder,
    private ariticle: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      tagList: new FormControl('', [Validators.required]),
    });
  }
  get(name) {
    return this.form['controls'][name];
  }

  onSubmit(form) {
    // console.log(form);
  }

  addNewArticle(): void {
    const token = localStorage.getItem('token');
    // this.isSubmitting = true;

    this.ariticle
      .getcreateArticle(this.form.value, token, this.tagList)
      .subscribe((data: SingleArticle) => {
        // console.log(data);
        // routerLink="/articles/{{ data.slug }}
        // this.router.navigate(['/', 'article', 'detail', data.article.slug]);
      });
    // if (!this.isEdited) {
    // } else {
    //   this.ariticle
    //     .getUpdateArticle(this.form.value, token, this.slug, this.tagList)
    //     .subscribe((data: SingleArticle) => {
    //       console.log(data);

    //       // this.router.navigate(['/', 'article', 'detail', data.article.slug]);
    //     });
    // }
  }
}
