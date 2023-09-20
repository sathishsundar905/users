import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UsersComponent } from './components/users/users.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'home', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
{ path: 'details', component: DetailsComponent, canActivate: [AuthGuardService] },
{ path: 'registration', component: RegistrationComponent, canActivate: [AuthGuardService] },
{ path: 'edit-user-details/:id', component: RegistrationComponent, canActivate: [AuthGuardService] },
{ path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
{ path: 'unauthorized', component: UnauthorizedComponent },
{ path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
