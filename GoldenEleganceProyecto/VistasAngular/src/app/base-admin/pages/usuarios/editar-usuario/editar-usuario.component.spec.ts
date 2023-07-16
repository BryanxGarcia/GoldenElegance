import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioComponent } from './editar-usuario.component';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('EditarUsuarioComponent', () => {
  let component: EditarUsuarioComponent;
  let fixture: ComponentFixture<EditarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarUsuarioComponent, DashboardNavigatorComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests that user is redirected to 'NotFound' page if id is not present
  it('test_id_not_present', () => {
    // Arrange
    const route = {
      params: of({})
    } as ActivatedRoute;
    const router = {
      navigate: jasmine.createSpy('navigate')
    } as unknown as Router;
    component.route = route;
    component.router = router;

    // Act
    component.ngOnInit();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['base/NotFound']);
  });

  // Tests that 'obtenerUsuario' method calls 'buscarPorId' method of 'user' service with correct id
  it('test_obtener_usuario_calls_buscar_por_id_with_correct_id', () => {
    const spy = spyOn(component.user, 'buscarPorId').and.callThrough();
    component.obtenerUsuario();
    expect(spy).toHaveBeenCalledWith(component.id);
  });

      // Tests that the user object is updated and the 'editarUsuario' method is called when the form is valid
      it('test_valid_form', () => {
        spyOn(component.user, 'editarUsuario');
        component.editForm.setValue({
          Nombre: 'John',
          Username: 'johndoe',
          Correo: 'john.doe@example.com',
          Apellido: 'Doe',
          Telefono: '1234567890',
          Direccion: '123 Main St',
          FKRol: 1
        });
        component.guardarUsuario();
        expect(component.Usuario.nombre).toEqual('John');
        expect(component.Usuario.username).toEqual('johndoe');
        expect(component.Usuario.correo).toEqual('john.doe@example.com');
        expect(component.Usuario.apellido).toEqual('Doe');
        expect(component.Usuario.telefono).toEqual('1234567890');
        expect(component.Usuario.direccion).toEqual('123 Main St');
        expect(component.Usuario.fkRol).toEqual(1);
        expect(component.user.editarUsuario).toHaveBeenCalledWith(component.Usuario);
      });
          // Tests that the user object is not updated and the 'editarUsuario' method is not called when the form is invalid
    it('test_invalid_form', () => {
      spyOn(component.user, 'editarUsuario');
      component.editForm.setValue({
        Nombre: '',
        Username: '',
        Correo: '',
        Apellido: '',
        Telefono: '',
        Direccion: '',
        FKRol: 0
      });
      component.guardarUsuario();
      expect(component.Usuario.nombre).toEqual('');
      expect(component.Usuario.username).toEqual('');
      expect(component.Usuario.correo).toEqual('');
      expect(component.Usuario.apellido).toEqual('');
      expect(component.Usuario.telefono).toEqual('');
      expect(component.Usuario.direccion).toEqual('');
      expect(component.Usuario.fkRol).toEqual(0);
      expect(component.user.editarUsuario).not.toHaveBeenCalled();
    });
});
