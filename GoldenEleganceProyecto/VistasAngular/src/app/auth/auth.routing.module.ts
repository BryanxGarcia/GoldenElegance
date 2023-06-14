import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { InicioComponent } from '../base-admin/pages/inicio/inicio.component';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Iniciar Sesión',
    }
  },
  {
    path: 'contactanos',
    component: ContactanosComponent,
    data: {
      title: 'Contactanos',
    }
  },
  {
    path: 'inicio',
    component: PagInicialComponent,
    data: {
      title: 'Golden Elegance',
    }
  },
  {
    path: 'restaurarContasena',
    component: ResetPasswordComponent,
    data: {
      title: 'Restaurar contraseña',
    }
  },
  
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
