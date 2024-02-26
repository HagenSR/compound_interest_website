import { TestBed } from '@angular/core/testing';
import { LegService } from './leg.service';


describe('LegService', () => {
  let service: LegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
