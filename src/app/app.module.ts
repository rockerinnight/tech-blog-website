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
import { ButtonComponent } from './components/commons/button/button.component';
import { NavBarComponent } from './components/commons/nav-bar/nav-bar.component';
import { NavComponent } from './components/commons/nav/nav.component';
import { InputComponent } from './components/commons/input/input.component';
import { TagComponent } from './components/commons/tag/tag.component';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { FooterComponent } from './components/commons/footer/footer.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
