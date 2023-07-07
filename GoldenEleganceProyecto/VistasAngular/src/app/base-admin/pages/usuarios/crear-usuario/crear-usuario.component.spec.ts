import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioComponent } from './crear-usuario.component';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CrearUsuarioComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearUsuarioComponent, DashboardNavigatorComponent], 
      imports: [HttpClientTestingModule,  ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
      // Tests that the method registers a user when the form is valid
      it('test_valid_form_registers_user', () => {
        component.sigUpForm.setValue({
            Nombre: 'John',
            Username: 'johndoe',
            Correo: 'john.doe@example.com',
            Password: 'password',
            Apellido: 'Doe',
            Telefono: '1234567890',
            Direccion: '123 Main St',
            FKRol: 'user'
        });
        spyOn(component.userService, 'registrarse');
        component.registrarUsuario();
        expect(component.userService.registrarse).toHaveBeenCalledWith(component.sigUpForm.value);
    });
        // Tests that the method does not register a user when the form is invalid
        it('test_invalid_form_does_not_register_user', () => {
          component.sigUpForm.setValue({
              Nombre: '',
              Username: '',
              Correo: '',
              Password: '',
              Apellido: '',
              Telefono: '',
              Direccion: '',
              FKRol: ''
          });
          spyOn(component.userService, 'registrarse');
          component.registrarUsuario();
          expect(component.userService.registrarse).not.toHaveBeenCalled();
      });
          // Tests that the method does not register a user when the form is empty
    it('test_empty_form_does_not_register_user', () => {
      spyOn(component.userService, 'registrarse');
      component.registrarUsuario();
      expect(component.userService.registrarse).not.toHaveBeenCalled();
  });
      // Tests that the method does not register a user when the form is partially filled
      it('test_partial_form_does_not_register_user', () => {
        component.sigUpForm.setValue({
            Nombre: 'John',
            Username: 'Johny',
            Correo: '',
            Password: '123xd',
            Apellido: '',
            Telefono: '',
            Direccion: '',
            FKRol: ''
        });
        spyOn(component.userService, 'registrarse');
        component.registrarUsuario();
        expect(component.userService.registrarse).not.toHaveBeenCalled();
    });
});
