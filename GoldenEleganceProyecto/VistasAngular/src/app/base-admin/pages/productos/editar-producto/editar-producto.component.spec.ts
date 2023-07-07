import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProductoComponent } from './editar-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { throwError } from 'rxjs';
describe('EditarProductoComponent', () => {
  let component: EditarProductoComponent;
  let fixture: ComponentFixture<EditarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProductoComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule,  ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
      // Tests that the product is updated with the new values from the form when the form is valid
      it('test_valid_form_updates_product', () => {
        spyOn(component.productosService, 'editarProducto');
        component.editarProductoForm.controls['NombreProducto'].setValue('new name');
        component.editarProductoForm.controls['Descripcion'].setValue('new description');
        component.editarProductoForm.controls['FkCategoria'].setValue(2);
        component.editarProductoForm.controls['precioVenta'].setValue(100);
        component.editarProductoForm.controls['Inventario'].setValue(50);
        component.editarProductoForm.controls['Imagen'].setValue('new image');
        component.editarProducto();
        expect(component.Producto.nombreProducto).toEqual('new name');
        expect(component.Producto.descripcion).toEqual('new description');
        expect(component.Producto.fkCategoria).toEqual(2);
        expect(component.Producto.precioVenta).toEqual(100);
        expect(component.Producto.inventario).toEqual(50);
        expect(component.Producto.imagen).toEqual('new image');
      });
          // Tests that the method handles a product ID not found
    it('should handle a product ID not found', () => {
      // Arrange
      const error = { status: 404 };
      spyOn(component.productosService, 'buscarPorId').and.returnValue(throwError(error));
      spyOn(console, 'error');
      // Act
      component.obtenerProducto();
      // Assert
      expect(console.error).toHaveBeenCalledWith('Error al obtener productos:', error);
    });
        // Tests that the method validates form fields
        it('should validate form fields', () => {
          // Arrange
          const form = component.editarProductoForm;
          // Act
          form.controls['NombreProducto'].setValue('');
          form.controls['Descripcion'].setValue('');
          form.controls['FkCategoria'].setValue('');
          form.controls['precioVenta'].setValue('');
          form.controls['Inventario'].setValue('');
          form.controls['Imagen'].setValue('');
          // Assert
          expect(form.valid).toBeFalsy();
        });
});
