import { TestBed } from '@angular/core/testing';

import { UserStoreService } from './user-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserStoreService', () => {
  let service: UserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
