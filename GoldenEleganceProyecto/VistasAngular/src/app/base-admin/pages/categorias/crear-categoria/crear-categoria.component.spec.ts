import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriaComponent } from './crear-categoria.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardNavigatorComponent } from 'src/app/shared/components/dashboard-navigator/dashboard-navigator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CrearCategoriaComponent', () => {
  let component: CrearCategoriaComponent;
  let fixture: ComponentFixture<CrearCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCategoriaComponent, DashboardNavigatorComponent], 
      imports: [HttpClientTestingModule,  ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CrearCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
