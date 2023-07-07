import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactanosComponent } from './contactanos.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ContactanosComponent', () => {
  let component: ContactanosComponent;
  let fixture: ComponentFixture<ContactanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactanosComponent, HeaderComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    });
    fixture = TestBed.createComponent(ContactanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Comprueba que enviar un formulario no válido, no enviara un mensaje
  it('test_formulario_invalido_no_envia_mesnaje', () => {
    const spy = spyOn(component.mensajeriaS, 'enviarContacto');
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });

  // Comprueba que el formulario sea valido para poder hacer submit
  it('test_valid_form_submission', () => {
    // Arrange
    component.contactoForm.controls['Nombre'].setValue('John Doe');
    component.contactoForm.controls['Correo'].setValue('johndoe@example.com');
    component.contactoForm.controls['Numero'].setValue('1234567890');
    component.contactoForm.controls['Mensaje'].setValue('Hello, World!');

    component.onSubmit();
    expect(component.contactoForm.valid).toBeTrue();
  });
});