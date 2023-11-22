import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ForgottPasswordComponent } from './forgott-password/forgott-password.component';
import { MainSiteComponent } from './main-site/main-site.component';

const routes: Routes = [
  { path: '', component: LoginWindowComponent},
  {
    path: 'main-site', component: MainSiteComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'user', component: UserComponent },
      { path: 'user/:id', component: DetailCardComponent }
    ]
  },
  { path: 'forgott-password', component: ForgottPasswordComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'sing-in', component: SingInComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
