import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAdminRoutingModule } from './base-admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CarritoCompraComponent } from './pages/carrito-compra/carrito-compra.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { FichaProductoComponent } from './pages/ficha-producto/ficha-producto.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NadvarUserComponent } from '../shared/components/nadvar-user/nadvar-user.component';
import { CrearRolComponent } from './pages/roles/crear-rol/crear-rol.component';
import { EliminarRolComponent } from './pages/roles/eliminar-rol/eliminar-rol.component';
import { EditarRolComponent } from './pages/roles/editar-rol/editar-rol.component';
import { ListarRolesComponent } from './pages/roles/listar-roles/listar-roles.component';
import { CrearUsuarioComponent } from './pages/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/usuarios/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './pages/usuarios/listar-usuario/listar-usuario.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './pages/productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './pages/productos/editar-producto/editar-producto.component';
import { CrearCategoriaComponent } from './pages/categorias/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './pages/categorias/editar-categoria/editar-categoria.component';
import { ListarCategoriaComponent } from './pages/categorias/listar-categoria/listar-categoria.component';
// import { SharedModule } from '../shared/shared.module';
// import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    CarritoCompraComponent,
    FavoritosComponent,
    FichaProductoComponent,
    HistorialComponent, 
    InicioComponent,
    PerfilUsuarioComponent,
    DashboardComponent,
    NadvarUserComponent,
    CrearRolComponent,
    EliminarRolComponent,
    EditarRolComponent,
    ListarRolesComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    ListarProductosComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    CrearCategoriaComponent,
    EditarCategoriaComponent,
    ListarCategoriaComponent
  ],
  imports: [
    CommonModule,
    BaseAdminRoutingModule,
    ReactiveFormsModule,
    // SharedModule,
    // NgxCaptchaModule
  ]
})
export class BaseAdminModule { }
