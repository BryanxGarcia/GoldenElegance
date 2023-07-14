import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAdminRoutingModule } from './base-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarritoCompraComponent } from './pages/carrito-compra/carrito-compra.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { FichaProductoComponent } from './pages/ficha-producto/ficha-producto.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NadvarUserComponent } from '../shared/components/nadvar-user/nadvar-user.component';
import { CrearRolComponent } from './pages/roles/crear-rol/crear-rol.component';
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
import { DashboardNavigatorComponent } from '../shared/components/dashboard-navigator/dashboard-navigator.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { SliderModule } from 'primeng/slider';
import { SiderbarUserComponent } from '../shared/components/siderbar/siderbar-user/siderbar-user.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    CarritoCompraComponent,
    FavoritosComponent,
    FichaProductoComponent,
    HistorialComponent, 
    InicioComponent,
    PerfilUsuarioComponent,
    DashboardComponent,
    CrearRolComponent,
    EditarRolComponent,
    ListarRolesComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    ListarProductosComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    CrearCategoriaComponent,
    ListarCategoriaComponent,
    EditarCategoriaComponent,
    DashboardNavigatorComponent,
    NadvarUserComponent,
    SiderbarUserComponent  

  ],
  imports: [
    CommonModule,
    BaseAdminRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MessagesModule,
    SliderModule,
    FormsModule,
    NgxPayPalModule
  ]
})
export class BaseAdminModule { }
