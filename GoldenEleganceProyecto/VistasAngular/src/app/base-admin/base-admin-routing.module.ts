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
import { CrearUsuarioComponent } from './pages/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/usuarios/editar-usuario/editar-usuario.component';
import { CrearRolComponent } from './pages/roles/crear-rol/crear-rol.component';
import { EditarRolComponent } from './pages/roles/editar-rol/editar-rol.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { CrearCategoriaComponent } from './pages/categorias/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './pages/categorias/editar-categoria/editar-categoria.component';
import { CrearProductoComponent } from './pages/productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './pages/productos/editar-producto/editar-producto.component';

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
  }, {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    data: {
      title: 'Mi perfil',
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
  },{
    path: 'productos/crear',
    component: CrearProductoComponent,
    data: {
      title: 'Crear producto',
    }
  },{
    path: 'productos/editar/:id',
    component: EditarProductoComponent,
    data: {
      title: 'Editar producto',
    }
  },  {
    path: 'ficha/:id',
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
      title: 'Categoria',
    }
  },
  {
    path: 'categoria/crear',
    component: CrearCategoriaComponent,
    data: {
      title: 'Crear categoria',
    }
  },{
    path: 'categoria/editar/:id',
    component: EditarCategoriaComponent,
    data: {
      title: 'Editar categoria',
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
