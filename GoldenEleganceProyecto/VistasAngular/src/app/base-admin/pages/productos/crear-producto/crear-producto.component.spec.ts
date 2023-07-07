import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearProductoComponent } from './crear-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProductoComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that the method calls 'crearProducto' on the 'productoService' with the correct argument when the 'productoForm' is valid.
  it('test_valid_form_creates_product', () => {
    const spy = spyOn(component.productoService, 'crearProducto');
    component.productoForm.setValue({
      NombreProducto: 'Test Product',
      Descripcion: 'Test Description',
      FkCategoria: 1,
      PrecioVenta: 10,
      Inventario: 5,
      Imagen: 'test-image-url'
    });
    component.registrarProducto();
    expect(spy).toHaveBeenCalledWith(component.productoForm.value);
  });
  // Tests that the method does not call 'crearProducto' on the 'productoService' when the 'productoForm' is invalid.
  it('test_invalid_form_does_not_create_product', () => {
    const spy = spyOn(component.productoService, 'crearProducto');
    component.productoForm.setValue({
      NombreProducto: '',
      Descripcion: '',
      FkCategoria: '',
      PrecioVenta: '',
      Inventario: '',
      Imagen: ''
    });
    component.registrarProducto();
    expect(spy).not.toHaveBeenCalled();
  });
  // Tests that the method does not call 'crearProducto' on the 'productoService' when the 'productoForm' is empty.
  it('test_empty_form_does_not_create_product', () => {
    const spy = spyOn(component.productoService, 'crearProducto');
    component.registrarProducto();
    expect(spy).not.toHaveBeenCalled();
  });
});
