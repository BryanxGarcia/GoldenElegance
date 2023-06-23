import { TestBed } from '@angular/core/testing';

import { MensajeriaService } from './mensajeria.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MensajeriaService', () => {
  let service: MensajeriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MensajeriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
