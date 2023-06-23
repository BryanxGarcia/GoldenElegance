import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FormResetPasswordComponent } from './pages/form-reset-password/form-reset-password.component';
import { ConfirmarEmailComponent } from './pages/confirmar-email/confirmar-email.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ContactanosComponent,
    PagInicialComponent,
    FormResetPasswordComponent,
    ConfirmarEmailComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
  
})
export class AuthModule { }
