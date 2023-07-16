import { TestBed } from '@angular/core/testing';

import { CarritoService } from './carrito.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
