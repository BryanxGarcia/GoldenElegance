import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavigatorComponent } from './dashboard-navigator.component';

describe('DashboardNavigatorComponent', () => {
  let component: DashboardNavigatorComponent;
  let fixture: ComponentFixture<DashboardNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNavigatorComponent]
    });
    fixture = TestBed.createComponent(DashboardNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
