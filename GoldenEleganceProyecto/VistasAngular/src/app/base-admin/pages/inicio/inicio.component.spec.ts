import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponent } from './inicio.component';
import { NadvarUserComponent } from 'src/app/shared/components/nadvar-user/nadvar-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioComponent, NadvarUserComponent], 
      imports: [HttpClientTestingModule]

    });
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
