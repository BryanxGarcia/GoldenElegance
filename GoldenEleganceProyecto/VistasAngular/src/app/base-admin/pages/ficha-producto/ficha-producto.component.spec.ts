import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaProductoComponent } from './ficha-producto.component';
import { NadvarUserComponent } from 'src/app/shared/components/nadvar-user/nadvar-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FichaProductoComponent', () => {
  let component: FichaProductoComponent;
  let fixture: ComponentFixture<FichaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaProductoComponent, NadvarUserComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FichaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
