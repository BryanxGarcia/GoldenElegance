import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NadvarUserComponent } from './nadvar-user.component';

describe('NadvarUserComponent', () => {
  let component: NadvarUserComponent;
  let fixture: ComponentFixture<NadvarUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
