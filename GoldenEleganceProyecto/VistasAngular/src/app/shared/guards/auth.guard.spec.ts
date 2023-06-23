import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: authGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});