import { TestBed } from '@angular/core/testing';

import { ColorProductService } from './color-product.service';

describe('ColorProductService', () => {
  let service: ColorProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
