import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilUsuarioComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
