import { TestBed } from '@angular/core/testing';

import { WeeklylogService } from './weeklylog.service';

describe('WeeklylogService', () => {
  let service: WeeklylogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklylogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
