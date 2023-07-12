import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaProductoComponent } from './ficha-producto.component';
import { NadvarUserComponent } from 'src/app/shared/components/nadvar-user/nadvar-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FichaProductoComponent', () => {
  let component: FichaProductoComponent;
  let fixture: ComponentFixture<FichaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaProductoComponent, NadvarUserComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });
    fixture = TestBed.createComponent(FichaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
