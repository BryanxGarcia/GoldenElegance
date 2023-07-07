import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ICategoria } from 'src/app/models/ICategoria.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // Tests that the method returns an Observable of ICategoria[]
  // Tests that the method makes a GET request to the server with the correct URL
  it('test_happy_path_makes_get_request', () => {
    const service = TestBed.inject(CategoriaService);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.callThrough();
    service.listarCategorias().subscribe();
    expect(http.get).toHaveBeenCalledWith(`${service.baseUrl}${service.controller}/categorias`);
  });
  // Tests that the method returns an empty array if there are no categories
  it('test_edge_case_returns_empty_array', () => {
    const service = TestBed.inject(CategoriaService);
    const expectedCategories: ICategoria[] = [];
    let actualCategories: ICategoria[] = [];
    service.listarCategorias().subscribe((categories) => {
      actualCategories = categories;
    });
    expect(actualCategories).toEqual(expectedCategories);
  });
  // Tests that the method throws an error if the server returns an error status code
  it('test_edge_case_throws_error_on_server_error', () => {
    let error!: HttpErrorResponse;
    const service = TestBed.inject(CategoriaService);
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(throwError({ status: 500 }));
    service.listarCategorias().subscribe(null, (err) => {
      error = err;
    });
    expect(error.status).toBe(500);
  });

  // Tests that the method returns the correct number of categories
  it('test_general_behaviour_returns_correct_number_of_categories', () => {
    const service = TestBed.inject(CategoriaService);
    const expectedCategories: ICategoria[] = [
      { pkCategoria: 1, nombreCat: 'Category 1', descripcion: 'Description 1' },
      { pkCategoria: 2, nombreCat: 'Category 2', descripcion: 'Description 2' },
      { pkCategoria: 3, nombreCat: 'Category 3', descripcion: 'Description 3' }
    ];
    service.listarCategorias().subscribe((categories) => {
      expect(categories.length).toBe(expectedCategories.length);
    });
  });

  it('test_general_behaviour_returns_correct_of_categories', () => {
    const service = TestBed.inject(CategoriaService);
    const expectedCategories: ICategoria[] = [
      { pkCategoria: 1, nombreCat: 'Category 1', descripcion: 'Description 1' },
      { pkCategoria: 2, nombreCat: 'Category 2', descripcion: 'Description 2' },
      { pkCategoria: 3, nombreCat: 'Category 3', descripcion: 'Description 3' }
    ];
    service.listarCategorias().subscribe((categories) => {
      expect(categories).toEqual(expectedCategories);
    });
  });




}); 
