import { TestBed } from '@angular/core/testing';

import { SummaryThreadService } from './summary-thread.service';

describe('SummaryThreadService', () => {
  let service: SummaryThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
