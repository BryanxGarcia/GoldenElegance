import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagInicialComponent } from './pag-inicial.component';

describe('PagInicialComponent', () => {
  let component: PagInicialComponent;
  let fixture: ComponentFixture<PagInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagInicialComponent]
    });
    fixture = TestBed.createComponent(PagInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
