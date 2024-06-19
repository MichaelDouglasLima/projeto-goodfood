import { TestBed } from '@angular/core/testing';

import { RealMealService } from './real-meal.service';

describe('RealMealService', () => {
  let service: RealMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
