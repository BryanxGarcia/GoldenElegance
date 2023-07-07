import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRolesComponent } from './listar-roles.component';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ListarRolesComponent', () => {
  let component: ListarRolesComponent;
  let fixture: ComponentFixture<ListarRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarRolesComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ListarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that 'obtenerProductos' sets 'Roles' property with the response from 'listarRol' method when it returns a non-empty array
  it('test_happy_path_listar_rol_returns_array', () => {
    const mockResponse = [{ pkRol: 1, nombre: 'admin', descripcion: 'descripcion' }, { pkRol: 2, nombre: 'user', descripcion: 'descripcion' }];
    spyOn(component.rolServicio, 'listarRol').and.returnValue(of(mockResponse));
    component.obtenerRoles();
    expect(component.Roles).toEqual(mockResponse);
  });
  // Tests that 'obtenerProductos' does not set 'Roles' property when 'listarRol' method returns an empty array
  it('test_happy_path_listar_rol_returns_empty_array', () => {
    const mockResponse:[] =[];
    spyOn(component.rolServicio, 'listarRol').and.returnValue(of(mockResponse));
    component.obtenerRoles();
    expect(component.Roles).toEqual(mockResponse);
  });
  // Tests that eliminarRol method of rolServicio is called with valid id
  it('test_eliminar_rol_with_valid_id', () => {
    const spy = spyOn(component.rolServicio, 'eliminarRol');
    component.eliminar(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
  
});
