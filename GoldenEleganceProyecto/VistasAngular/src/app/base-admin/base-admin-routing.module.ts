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
import { CrearUsuarioComponent } from './pages/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/usuarios/editar-usuario/editar-usuario.component';
import { CrearRolComponent } from './pages/roles/crear-rol/crear-rol.component';
import { EditarRolComponent } from './pages/roles/editar-rol/editar-rol.component';


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
    path: 'usuarios',
    component: ListarUsuarioComponent,
    data: {
      title: 'Inicio',
    }
  },
  {
    path: 'usuario/crear',
    component: CrearUsuarioComponent,
    data: {
      title: 'Crear usuario',
    }
  },
  {
    path: 'usuario/editar/:id',
    component: EditarUsuarioComponent,
    data: {
      title: 'Editar usuario',
    }
  },
    {
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
    path: 'roles/crear',
    component: CrearRolComponent,
    data: {
      title: 'Crear rol',
    }
  },{
    path: 'roles/editar/:id',
    component: EditarRolComponent,
    data: {
      title: 'Editar rol',
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
