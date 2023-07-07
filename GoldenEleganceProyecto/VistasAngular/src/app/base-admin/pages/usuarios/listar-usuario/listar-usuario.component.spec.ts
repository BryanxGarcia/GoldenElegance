import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarUsuarioComponent } from './listar-usuario.component';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { throwError } from 'rxjs';

describe('ListarUsuarioComponent', () => {
  let component: ListarUsuarioComponent;
  let fixture: ComponentFixture<ListarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarUsuarioComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ListarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that ngOnInit calls obtenerProductos method
  it('test_calls_obtener_productos', () => {
    spyOn(component, 'obtenerProductos');
    component.ngOnInit();
    expect(component.obtenerProductos).toHaveBeenCalled();
  });

  // Tests that 'obtenerProductos' method does not set 'usuarios' property if there is an error
  it('test_general_behaviour_no_set_usuarios_on_error', () => {
    spyOn(component.userServicio, 'listarUsuarios').and.returnValue(throwError('error'));
    component.obtenerProductos();
    expect(component.usuarios).toEqual([]);
  });
    // Tests that the method logs an error if there is an error retrieving the list of users
    it('test_error_logging', () => {
      const mockError = 'Error retrieving users';
      spyOn(component.userServicio, 'listarUsuarios').and.returnValue(throwError(mockError));
      spyOn(console, 'error');
      component.obtenerProductos();
      expect(console.error).toHaveBeenCalledWith('Error al obtener productos:', mockError);
  });

});
