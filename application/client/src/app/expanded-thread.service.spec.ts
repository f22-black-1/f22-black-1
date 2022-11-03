import { TestBed } from '@angular/core/testing';

import { ExpandedThreadService } from './expanded-thread.service';

describe('ExpandedThreadService', () => {
  let service: ExpandedThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpandedThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
