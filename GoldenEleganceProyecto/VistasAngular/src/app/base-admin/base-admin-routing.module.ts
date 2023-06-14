import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoCompraComponent } from './pages/carrito-compra/carrito-compra.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'carrito',
    component: CarritoCompraComponent,
    data: {
      title: 'Carrito de compra',
    }
  },
  {
    path: 'favoritos',
    component: FavoritosComponent,
    data: {
      title: 'Favoritos',
    }
  },
  {
    path: 'historial',
    component: HistorialComponent,
    data: {
      title: 'Historial',
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
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
export class BaseAdminRoutingModule { }
