import { TestBed } from '@angular/core/testing';

import { NutritionistClientService } from './nutritionist-client.service';

describe('NutritionistClientService', () => {
  let service: NutritionistClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionistClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
