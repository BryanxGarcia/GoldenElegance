import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoCompraComponent } from './pages/carrito-compra/carrito-compra.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { ListarUsuarioComponent } from './pages/usuarios/listar-usuario/listar-usuario.component';
import { ListarCategoriaComponent } from './pages/categorias/listar-categoria/listar-categoria.component';
import { ListarRolesComponent } from './pages/roles/listar-roles/listar-roles.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { FichaProductoComponent } from './pages/ficha-producto/ficha-producto.component';


const routes: Routes = [
  {
    path: 'carrito',
    component: CarritoCompraComponent,
    data: {
      title: 'Carrito de compra',
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
    path: 'inicio',
    component: InicioComponent,
    data: {
      title: 'Inicio',
    }
  },
  {
    path: 'productos',
    component: ListarProductosComponent,
    data: {
      title: 'Productos',
    }
  },  {
    path: 'ficha',
    component: FichaProductoComponent,
    data: {
      title: 'Ficha de producto',
    }
  },{
    path: 'usuarios',
    component: ListarUsuarioComponent,
    data: {
      title: 'Inicio',
    }
  },  {
    path: 'categorias',
    component: ListarCategoriaComponent,
    data: {
      title: 'Roles',
    }
  },  {
    path: 'roles',
    component: ListarRolesComponent,
    data: {
      title: 'Roles',
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
