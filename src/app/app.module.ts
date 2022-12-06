import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ParticlesModule } from 'angular-particle';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './components/screens/home/home.component';
import { LoginComponent } from './components/screens/login/login.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { AboutUsComponent } from './components/screens/about-us/about-us.component';
import { ParticleComponent } from './components/commons/particle/particle.component';
import { MyFeedComponent } from './components/screens/home/my-feed/my-feed.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { ChangelogComponent } from './components/screens/changelog/changelog.component';
import { TagFeedComponent } from './components/screens/home/tag-feed/tag-feed.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { NewArticleComponent } from './components/screens/new-article/new-article.component';
import { ArticleCardComponent } from './components/commons/article-card/article-card.component';
import { GlobalFeedComponent } from './components/screens/home/global-feed/global-feed.component';
import { MyArticlesComponent } from './components/screens/profile/my-articles/my-articles.component';
import { ArticleDetailComponent } from './components/screens/article-detail/article-detail.component';
import { FavoriteArticlesComponent } from './components/screens/profile/favorite-articles/favorite-articles.component';

import { AuthInterceptor } from './auth.interceptor';
import { TruncatePipe } from './helpers/truncate.pipe';

const declarations = [
  TruncatePipe,

  AppComponent,
  HomeComponent,
  LoginComponent,
  NavBarComponent,
  FooterComponent,
  MyFeedComponent,
  TagFeedComponent,
  AboutUsComponent,
  SignUpComponent,
  SettingComponent,
  ProfileComponent,
  NotFoundComponent,
  ParticleComponent,
  ChangelogComponent,
  NewArticleComponent,
  PaginationComponent,
  MyArticlesComponent,
  GlobalFeedComponent,
  ArticleCardComponent,
  ArticleDetailComponent,
  FavoriteArticlesComponent,
];

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];

@NgModule({
  declarations,
  imports: [
    FormsModule,
    BrowserModule,
    ParticlesModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers,
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
