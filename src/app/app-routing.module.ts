import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/screens/home/home.component';
import { LoginGuard } from './helpers/login.guard';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/screens/login/login.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { ProfileComponent } from './components/screens/profile/profile.component';
import { ArticleDetailComponent } from './components/screens/article-detail/article-detail.component';
import { NewArticleComponent } from './components/screens/new-article/new-article.component';
import { EditArticleComponent } from './components/screens/edit-article/edit-article.component';
import { ChangelogComponent } from './components/screens/changelog/changelog.component';
import { AboutUsComponent } from './components/screens/about-us/about-us.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-article',
    component: NewArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'changelogs',
    component: ChangelogComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
