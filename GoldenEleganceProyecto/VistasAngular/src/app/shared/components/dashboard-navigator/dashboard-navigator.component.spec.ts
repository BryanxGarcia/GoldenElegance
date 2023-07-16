import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavigatorComponent } from './dashboard-navigator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardNavigatorComponent', () => {
  let component: DashboardNavigatorComponent;
  let fixture: ComponentFixture<DashboardNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNavigatorComponent],
      imports: [HttpClientTestingModule]

    });
    fixture = TestBed.createComponent(DashboardNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
