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
});
