import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/screens/home/home.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { ArticleComponent } from './components/screens/article/article.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { LoginComponent } from './components/screens/login/login.component';
import { ButtonsComponent } from './components/commons/buttons/buttons.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { TagComponent } from './components/commons/tag/tag.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { CommentCardComponent } from './components/commons/comment-card/comment-card.component';
import { NewAriticleComponent } from './components/commons/new-ariticle/new-ariticle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    ProfileComponent,
    ArticleComponent,
    SignUpComponent,
    LoginComponent,
    ButtonsComponent,
    NavBarComponent,

    TagComponent,
    PaginationComponent,
    FooterComponent,
    CommentCardComponent,
    NewAriticleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
