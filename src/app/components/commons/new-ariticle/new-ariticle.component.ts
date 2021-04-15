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
import { AuthService } from 'src/app/_services/auth.service';

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
    private authService: AuthService,
    private ariticle: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
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

  get(name) {
    return this.form['controls'][name];
  }

  onSubmit(form) {
    // console.log(form);
  }

  addNewArticle(): void {
    this.ariticle.getcreateArticle(this.form.value).subscribe((res: any) => {
      this.router.navigateByUrl(
        `/profile/${this.authService.getUser().username}`
      );
    });
  }
}
