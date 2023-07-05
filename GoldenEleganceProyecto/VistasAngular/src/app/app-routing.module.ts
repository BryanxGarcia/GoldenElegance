import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard]
  },
  {  
    path: 'base',
    loadChildren: () => import('./base-admin/base-admin.module').then(m => m.BaseAdminModule),
    canActivate: [authGuard]
    // canLoad: [AdminGuard]
  },
  {
    path: 'NotFound',
    component: NotFoundComponent,
    data: {
      title: 'Pagina no encontrada',
    }
  },
  {
    path: '**',
    redirectTo: 'NotFound'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
