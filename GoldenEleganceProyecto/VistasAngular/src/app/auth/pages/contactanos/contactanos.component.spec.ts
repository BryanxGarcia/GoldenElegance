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
      imports: [HttpClientTestingModule,  ReactiveFormsModule, FormsModule]

    });
    fixture = TestBed.createComponent(ContactanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
