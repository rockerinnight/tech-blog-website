import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAriticleComponent } from './components/commons/new-ariticle/new-ariticle.component';
import { SettingComponent } from './components/screens/setting/setting.component';
import { SignUpComponent } from './components/screens/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: 'newArticle',
    component: NewAriticleComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
