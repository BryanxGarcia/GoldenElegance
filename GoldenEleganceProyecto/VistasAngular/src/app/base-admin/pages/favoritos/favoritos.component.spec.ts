import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosComponent } from './favoritos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritosComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });
    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
