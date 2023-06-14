import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ContactanosComponent,
    PagInicialComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    // SharedModule,
    // NgxCaptchaModule
  ]
})
export class AuthModule { }
