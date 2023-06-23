import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResetPasswordComponent } from './form-reset-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormResetPasswordComponent', () => {
  let component: FormResetPasswordComponent;
  let fixture: ComponentFixture<FormResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormResetPasswordComponent, HeaderComponent], 
      imports:[RouterTestingModule, HttpClientTestingModule,ReactiveFormsModule, FormsModule]
      
    });
    fixture = TestBed.createComponent(FormResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
