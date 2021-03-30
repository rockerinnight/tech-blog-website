import { SettingComponent } from './components/screens/setting/setting.component';
import { NotFoundComponent } from './components/screens/not-found/not-found.component';
import { HomeComponent } from './components/screens/home/home.component';
import { LoginComponent } from './components/screens/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  },
  {
    path: 'settings',
    component: SettingComponent,
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
