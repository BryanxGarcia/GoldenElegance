import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmarEmailComponent } from './confirmar-email.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

describe('ConfirmarEmailComponent', () => {
  let component: ConfirmarEmailComponent;
  let fixture: ComponentFixture<ConfirmarEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarEmailComponent, HeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]

    });
    fixture = TestBed.createComponent(ConfirmarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests that confirmarCuenta method calls the confirmarCuenta method of the AuthService service with the confirmarObj object as parameter
  it('test_happy_path_confirmar_cuenta', () => {
    spyOn(component.authS, 'confirmarCuenta');
    component.confirmarCuenta();
    expect(component.authS.confirmarCuenta).toHaveBeenCalledWith(component.confirmarObj);
  });
  // Tests that confirmarCuenta method does not call the confirmarCuenta method of the AuthService service when email property of confirmarObj is undefined
  // it('test_edge_case_confirmar_cuenta_email_undefined', () => {
  //   component.confirmarObj = null!;
  //   component.confirmarCuenta();
  //   expect(component.authS.confirmarCuenta).not.toHaveBeenCalled();
  // });
});
