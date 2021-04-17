import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/screens/profile/profile.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { HomeComponent } from './components/screens/home/home.component';
import { LoginComponent } from './components/screens/login/login.component';
import { NewAriticleComponent } from './components/commons/new-ariticle/new-ariticle.component';
import { ArticleDetailComponent } from './components/screens/article-detail/article-detail.component';
import { LoginGuard } from './_helpers/login.guard';
import { AuthGuard } from './_helpers/auth.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';

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
    path: 'newArticle',
    component: NewAriticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuard],
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
