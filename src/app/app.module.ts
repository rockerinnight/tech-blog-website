import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/screens/home/home.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { ButtonsComponent } from './components/commons/buttons/buttons.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { NavComponent } from './components/commons/nav/nav.component';
import { InputComponent } from './components/commons/input/input.component';
import { TagComponent } from './components/commons/tag/tag.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { ArticleDetailComponent } from './components/screens/article-detail/article-detail.component';
import { MyFeedComponent } from './components/screens/home/my-feed/my-feed.component';
import { GlobalFeedComponent } from './components/screens/home/global-feed/global-feed.component';
import { ArticleService } from './services/article.service';
import { AuthInterceptor } from './auth.interceptor';
import { ArticleCardComponent } from './components/commons/article-card/article-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    ProfileComponent,
    SignUpComponent,
    LoginComponent,
    ButtonsComponent,
    NavBarComponent,
    NavComponent,
    InputComponent,
    TagComponent,
    PaginationComponent,
    FooterComponent,
    ArticleDetailComponent,
    MyFeedComponent,
    GlobalFeedComponent,
    ArticleCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
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
