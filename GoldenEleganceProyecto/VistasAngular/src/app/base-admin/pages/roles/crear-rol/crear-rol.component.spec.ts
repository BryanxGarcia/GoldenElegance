import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrearRolComponent } from './crear-rol.component';

describe('CrearRolComponent', () => {
  let component: CrearRolComponent;
  let fixture: ComponentFixture<CrearRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearRolComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CrearRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that the registrarRol method calls the rolService registrarRol method with the form value when the form is valid
  it('test_valid_form_calls_service', () => {
    spyOn(component.rolService, 'registrarRol');
    component.crearRol.setValue({
      Nombre: 'Test',
      Descripcion: 'Test'
    });
    component.registrarRol();
    expect(component.rolService.registrarRol).toHaveBeenCalledWith(
      component.crearRol.value
    );
  });
      // Tests that the registrarRol method does not call the rolService registrarRol method when the form is invalid
      it('test_invalid_form_does_not_call_service', () => {
        spyOn(component.rolService, 'registrarRol');
        component.crearRol.setValue({
            Nombre: '',
            Descripcion: ''
        });
        component.registrarRol();
        expect(component.rolService.registrarRol).not.toHaveBeenCalled();
    });
        // Tests that the registrarRol method does not call the rolService registrarRol method when the form is empty
        it('test_empty_form_does_not_call_service', () => {
          spyOn(component.rolService, 'registrarRol');
          component.crearRol.reset();
          component.registrarRol();
          expect(component.rolService.registrarRol).not.toHaveBeenCalled();
      });
});
