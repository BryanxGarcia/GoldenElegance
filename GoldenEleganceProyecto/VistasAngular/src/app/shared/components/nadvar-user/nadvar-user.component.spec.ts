import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NadvarUserComponent } from './nadvar-user.component';

describe('NadvarUserComponent', () => {
  let component: NadvarUserComponent;
  let fixture: ComponentFixture<NadvarUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [NadvarUserComponent]
    });
    fixture = TestBed.createComponent(NadvarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
