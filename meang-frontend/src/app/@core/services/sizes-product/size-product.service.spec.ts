import { TestBed } from '@angular/core/testing';

import { SizeProductService } from './size-product.service';

describe('SizeProductService', () => {
  let service: SizeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
