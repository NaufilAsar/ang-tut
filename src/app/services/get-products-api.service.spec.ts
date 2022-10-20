import { TestBed } from '@angular/core/testing';

import { GetProductsApiService } from './get-products-api.service';

describe('GetProductsApiService', () => {
  let service: GetProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
