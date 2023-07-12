import { TestBed } from '@angular/core/testing';

import { FavoritosService } from './favoritos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoritosService', () => {
  let service: FavoritosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FavoritosService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
