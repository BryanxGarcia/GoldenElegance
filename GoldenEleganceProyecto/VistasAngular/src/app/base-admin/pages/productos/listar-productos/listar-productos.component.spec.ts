import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarProductosComponent } from './listar-productos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListarProductosComponent', () => {
  let component: ListarProductosComponent;
  let fixture: ComponentFixture<ListarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarProductosComponent, DashboardNavigatorComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ListarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
      // Tests that 'obtenerProductos' sets 'Prductos' property when 'listarProducto' method returns an array
      it('test_happy_path_listar_producto_returns_array', () => {
        const mockResponse = [{pkProducto: 1, nombreProducto: 'product1', descripcion:'descripcion1', fkCategoria:1, precioVenta:1, inventario:1, imagen:''}];
        spyOn(component.prodService, 'listarProducto').and.returnValue(of(mockResponse));
        component.obtenerProductos();
        expect(component.Prductos).toEqual(mockResponse);
    });
});
