import { TestBed } from '@angular/core/testing';
import { CompoundInterestService } from './compound-interest.service';
import { CompoundInterestResultQuery } from './compound-interest-result.query';


describe('CompoundInterestService', () => {
  let service: CompoundInterestService;
  let query: CompoundInterestResultQuery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompoundInterestService);
    query = TestBed.inject(CompoundInterestResultQuery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('simple calc no interest', () => {
    service.runCalculationEveryYear({
      id: 0,
      currentPrincipal: 0,
      annualAddition: 100,
      yearsToGrow: 5,
      interestRate: 0
    })
    expect(query.getEntity(0)?.results.map((yearBal) => yearBal.balance)).toEqual([0, 100, 200, 300, 400, 500]);
  });

  it('interest calculation with interest rate', () => {
    service.runCalculationEveryYear({
      id: 0,
      currentPrincipal: 0,
      annualAddition: 100,
      yearsToGrow: 5,
      interestRate: 5
    })
    expect(query.getEntity(0)?.results.map((yearBal) => yearBal.balance)).toEqual([0, 100, 205, 315.25, 431.01, 552.56]);
  });

  it('another interest calculation', () => {
    service.runCalculationEveryYear({
      id: 0,
      currentPrincipal: 89,
      annualAddition: 1003,
      yearsToGrow: 16,
      interestRate: 17
    })
    expect(query.getEntity(0)?.results.map((yearBal) => yearBal.balance)).toEqual([89, 1107.13, 2298.34, 3692.06, 5322.71, 7230.57, 9462.77, 12074.44, 15130.09, 18705.21, 22888.10, 27782.08, 33508.03, 40207.4, 48045.66, 57216.42, 67946.21]);
  });
});
