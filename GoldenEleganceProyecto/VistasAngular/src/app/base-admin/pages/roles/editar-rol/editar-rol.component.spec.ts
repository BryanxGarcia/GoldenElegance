import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRolComponent } from './editar-rol.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EditarRolComponent', () => {
  let component: EditarRolComponent;
  let fixture: ComponentFixture<EditarRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarRolComponent],
      imports: [HttpClientTestingModule,  ReactiveFormsModule, FormsModule]

    });
    fixture = TestBed.createComponent(EditarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
