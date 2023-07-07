import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResetPasswordComponent } from './form-reset-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

describe('FormResetPasswordComponent', () => {
  let component: FormResetPasswordComponent;
  let fixture: ComponentFixture<FormResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormResetPasswordComponent, HeaderComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(FormResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that AuthService.resetPassword is not called when form is submitted with invalid data
  it('test_invalid_data_submit', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'resetPassword');
    component.onSubmit();
    expect(authService.resetPassword).not.toHaveBeenCalled();
  });

  //Tests that AuthService.resetPassword is not called when emailToReset is undefined
  it('test_emailToReset_undefined', () => {
    const authService = TestBed.inject(AuthService);
    component.emailtoken = 'test_token';
    component.resetPasswordForm.setValue({
      password: 'password',
      confirmPassword: 'password',
    });
    spyOn(authService, 'resetPassword');
    component.onSubmit();
    expect(authService.resetPassword).not.toHaveBeenCalled();
  });
});
