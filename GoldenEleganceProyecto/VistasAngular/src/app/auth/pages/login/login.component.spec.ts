import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that iniciarSesion method of AuthService is called when loginForm is valid
  it('test_valid_login', () => {
    const authSpy = spyOn(component.auth, 'iniciarSesion');
    component.loginForm.setValue({ Correo: 'test@test.com', Password: '123456' });
    component.onLogin();
    expect(authSpy).toHaveBeenCalled();
  });
  // Tests that iniciarSesion method of AuthService is not called when loginForm is invalid
  it('test_invalid_login', () => {
    const authSpy = spyOn(component.auth, 'iniciarSesion');
    component.loginForm.setValue({ Correo: '', Password: '' });
    component.onLogin();
    expect(authSpy).not.toHaveBeenCalled();
  });
  // Tests that iniciarSesion method of AuthService is not called when loginForm is empty
  it('test_empty_login', () => {
    const authSpy = spyOn(component.auth, 'iniciarSesion');
    component.loginForm.reset();
    component.onLogin();
    expect(authSpy).not.toHaveBeenCalled();
  });
});
