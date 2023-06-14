import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaProductoComponent } from './ficha-producto.component';

describe('FichaProductoComponent', () => {
  let component: FichaProductoComponent;
  let fixture: ComponentFixture<FichaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaProductoComponent]
    });
    fixture = TestBed.createComponent(FichaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
