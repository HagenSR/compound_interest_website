import { Injectable } from '@angular/core';
import { CompoundInterestCalculation } from './models/compound-interest-calculation.model';

@Injectable({
  providedIn: 'root'
})
export class CompoundInterestService {

  constructor() { }

  runCalculationEveryYear(vals: CompoundInterestCalculation): number[] {
    const balYears = [vals.currentPrincipal!]
    for (let i = 1; i < vals.yearsToGrow! + 1; i++) {
      balYears.push(this.runCalculation(vals))
      vals.currentPrincipal = balYears[i]
    }
    console.log(balYears)
    return balYears;
  }

  private runCalculation(vls: CompoundInterestCalculation): number {
    const percent = 1 + ((vls.interestRate! / 100))
    const endBalance = vls.currentPrincipal! * percent
    return endBalance + vls.annualAddition!
  }

}
