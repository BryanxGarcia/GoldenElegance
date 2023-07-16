import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoCompraComponent } from './carrito-compra.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SiderbarUserComponent } from 'src/app/shared/components/siderbar/siderbar-user/siderbar-user.component';

describe('CarritoCompraComponent', () => {
  let component: CarritoCompraComponent;
  let fixture: ComponentFixture<CarritoCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoCompraComponent, SiderbarUserComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]


    });
    fixture = TestBed.createComponent(CarritoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
