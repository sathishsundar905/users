import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UsersComponent } from './components/users/users.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpInterceptorInterceptor } from './http-interceptor/http-interceptor.interceptor';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UnauthorizedComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    DashboardComponent,
    AlertComponent,
    UsersComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [AuthGuardService,{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
