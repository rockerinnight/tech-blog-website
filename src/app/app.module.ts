// import { TokenInterceptor } from './_helpers/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/screens/home/home.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { ButtonComponent } from './components/commons/button/button.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { TagComponent } from './components/commons/tag/tag.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { ArticleDetailComponent } from './components/screens/article-detail/article-detail.component';
import { MyFeedComponent } from './components/screens/home/my-feed/my-feed.component';
import { GlobalFeedComponent } from './components/screens/home/global-feed/global-feed.component';
import { ArticleService } from './services/article.service';
import { AuthInterceptor } from './auth.interceptor';
import { ArticleCardComponent } from './components/commons/article-card/article-card.component';
import { NewAriticleComponent } from './components/commons/new-ariticle/new-ariticle.component';
import { ButtonLikeComponent } from './components/commons/button-like/button-like.component';
import { ButtonTagComponent } from './components/commons/button-tag/button-tag.component';
import { ButtonFollowComponent } from './components/commons/button-follow/button-follow.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { CommentCardComponent } from './components/commons/comment-card/comment-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    ProfileComponent,
    SignUpComponent,
    LoginComponent,
    ButtonComponent,
    NavBarComponent,

    TagComponent,
    PaginationComponent,
    FooterComponent,
    CommentCardComponent,
    NewAriticleComponent,
    NotFoundComponent,
    ButtonLikeComponent,
    ButtonFollowComponent,
    ButtonTagComponent,
    ArticleDetailComponent,
    MyFeedComponent,
    GlobalFeedComponent,
    ArticleCardComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
