import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarUserComponent } from './siderbar-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SiderbarUserComponent', () => {
  let component: SiderbarUserComponent;
  let fixture: ComponentFixture<SiderbarUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiderbarUserComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    });
    fixture = TestBed.createComponent(SiderbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
