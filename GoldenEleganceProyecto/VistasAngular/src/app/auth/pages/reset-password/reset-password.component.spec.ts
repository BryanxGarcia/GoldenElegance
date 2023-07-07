import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent, HeaderComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]

    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that sendResetPassword method is called with valid email value
  it('test_valid_email', () => {
    spyOn(component.authS, 'sendResetPassword');
    component.emailPassword.controls['Correo'].setValue('valid_email@test.com');
    component.onSubmit();
    expect(component.authS.sendResetPassword).toHaveBeenCalledWith('valid_email@test.com');
  });
  // Tests that sendResetPassword method is not called if email field is empty
  it('test_empty_email', () => {
    spyOn(component.authS, 'sendResetPassword');
    component.emailPassword.controls['Correo'].setValue('');
    component.onSubmit();
    expect(component.authS.sendResetPassword).not.toHaveBeenCalled();
  });
  // Tests that sendResetPassword method is not called if email format is invalid

});
