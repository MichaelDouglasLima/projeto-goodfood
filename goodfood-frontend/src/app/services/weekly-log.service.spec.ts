import { TestBed } from '@angular/core/testing';

import { WeeklyLogService } from './weekly-log.service';

describe('WeeklyLogService', () => {
  let service: WeeklyLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
