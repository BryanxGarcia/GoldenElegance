import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarUserComponent } from './siderbar-user.component';

describe('SiderbarUserComponent', () => {
  let component: SiderbarUserComponent;
  let fixture: ComponentFixture<SiderbarUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiderbarUserComponent]
    });
    fixture = TestBed.createComponent(SiderbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
