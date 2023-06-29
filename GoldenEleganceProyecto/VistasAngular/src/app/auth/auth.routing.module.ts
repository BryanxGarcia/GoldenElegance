import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { PagInicialComponent } from './pages/pag-inicial/pag-inicial.component';
import { FormResetPasswordComponent } from './pages/form-reset-password/form-reset-password.component';
import { ConfirmarEmailComponent } from './pages/confirmar-email/confirmar-email.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

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
    path: 'NotFound',
    component: NotFoundComponent,
    data: {
      title: 'Pagina no encontrada',
    }
  },
  {
    path: 'reset',
    component: FormResetPasswordComponent,
    data: {
      title: 'Restauracion de contraseña',
    }
  },
  {
    path: 'confirmacion',
    component: ConfirmarEmailComponent,
    data: {
      title: 'Confirmacion de cuenta',
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
