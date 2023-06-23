import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagInicialComponent } from './pag-inicial.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

describe('PagInicialComponent', () => {
  let component: PagInicialComponent;
  let fixture: ComponentFixture<PagInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagInicialComponent, HeaderComponent]
    });
    fixture = TestBed.createComponent(PagInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
