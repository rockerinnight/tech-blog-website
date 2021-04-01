import { AuthGuard } from './_helpers/auth.guard';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { HomeComponent } from './components/screens/home/home.component';
import { LoginComponent } from './components/screens/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAriticleComponent } from './components/commons/new-ariticle/new-ariticle.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingComponent,
  },
  {
    path: 'newArticle',
    component: NewAriticleComponent,
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
