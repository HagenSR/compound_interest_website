import { TestBed } from '@angular/core/testing';

import { CompoundInterestService } from './compound-interest.service';

describe('CompoundInterestService', () => {
  let service: CompoundInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompoundInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
