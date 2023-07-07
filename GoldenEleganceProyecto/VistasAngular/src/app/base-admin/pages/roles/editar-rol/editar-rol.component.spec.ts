import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarRolComponent } from './editar-rol.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditarRolComponent', () => {
  let component: EditarRolComponent;
  let fixture: ComponentFixture<EditarRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarRolComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule,  ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
      // Tests that the method patches the form values and calls 'editarRol' method of 'rolesService' when the 'editarRol' form is valid
      it('test_valid_form', () => {
        spyOn(component.rolesService, 'editarRol');
        component.Roles = {
            pkRol: 1,
            nombre: 'test',
            descripcion: 'test'
        };
        component.editarRol.controls['Nombre'].setValue('test');
        component.editarRol.controls['Descripcion'].setValue('test');
        component.guardarRol();
        expect(component.editarRol.valid).toBeTruthy();
        expect(component.editarRol.value).toEqual({
            Nombre: 'test',
            Descripcion: 'test'
        });
        expect(component.rolesService.editarRol).toHaveBeenCalledWith(component.Roles);
    });
        // Tests that the method does not patch the form values and does not call 'editarRol' method of 'rolesService' when the 'editarRol' form is invalid
        it('test_invalid_form', () => {
          spyOn(component.rolesService, 'editarRol');
          component.Roles = {
              pkRol: 1,
              nombre: 'test',
              descripcion: 'test'
          };
          component.editarRol.controls['Nombre'].setValue('');
          component.editarRol.controls['Descripcion'].setValue('');
          component.guardarRol();
          expect(component.editarRol.valid).toBeFalsy();
          expect(component.editarRol.value).toEqual({
              Nombre: '',
              Descripcion: ''
          });
          expect(component.rolesService.editarRol).not.toHaveBeenCalled();
      });
          // Tests that the method does not call 'editarRol' method of 'rolesService' when the 'editarRol' form is invalid
    it('test_invalid_form_no_editarRol_call', () => {
      spyOn(component.rolesService, 'editarRol');
      component.Roles = {
          pkRol: 1,
          nombre: 'test',
          descripcion: 'test'
      };
      component.editarRol.controls['Nombre'].setValue('');
      component.editarRol.controls['Descripcion'].setValue('');
      component.guardarRol();
      expect(component.rolesService.editarRol).not.toHaveBeenCalled();
  });
});
