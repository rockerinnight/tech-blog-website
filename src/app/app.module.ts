// import { TokenInterceptor } from './_helpers/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/screens/home/home.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { ArticleComponent } from './components/screens/article/article.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { ButtonComponent } from './components/commons/button/button.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { NavComponent } from './components/commons/nav/nav.component';
import { InputComponent } from './components/commons/input/input.component';
import { TagComponent } from './components/commons/tag/tag.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonLikeComponent } from './components/commons/button-like/button-like.component';
import { ButtonFollowComponent } from './components/commons/button-follow/button-follow.component';
import { ButtonTagComponent } from './components/commons/button-tag/button-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    ProfileComponent,
    ArticleComponent,
    SignUpComponent,
    LoginComponent,
    ButtonComponent,
    NavBarComponent,
    NavComponent,
    InputComponent,
    TagComponent,
    PaginationComponent,
    FooterComponent,
    NotFoundComponent,
    ButtonLikeComponent,
    ButtonFollowComponent,
    ButtonTagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
