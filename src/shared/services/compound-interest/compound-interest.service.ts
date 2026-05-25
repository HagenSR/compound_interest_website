import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CompoundInterestCalculation } from '../../models/compound-interest-calculation.model';
import { CompoundInterestResultState } from './compound-interest-result.state';
import { UpsertResult, RemoveResult, ResetResults } from './compound-interest-result.actions';
import { delay, map } from 'rxjs';
import { YearAndBalance } from 'src/shared/models/year-and-balance.model';
import { CompoundInterestResult } from 'src/shared/models/compound-interest-result.model';
import { LegService } from '../leg/leg.service';

@Injectable({ providedIn: 'root' })
export class CompoundInterestService {
  private readonly store = inject(Store);
  private readonly legService = inject(LegService);


  chartData$ = this.store.select(CompoundInterestResultState.getAllResults).pipe(
    delay(0),
    map((data) => {
      const years = this.getYears(data);
      const datasets = this.getDatasets(data);
      return { labels: years, datasets: datasets };
    })
  );

  tableData$ = this.store.select(CompoundInterestResultState.getAllResults).pipe(
    delay(0),
    map((data) => data.flatMap((row) => row.results.map((res) => {
      return {
        ...row,
        simulation: row.id + 1,
        year: res.year,
        balance: res.balance,
      };
    })))
  );

  runCalculationEveryYear(vals: CompoundInterestCalculation) {
    const curYear = this.getYear(vals);
    const balYears: YearAndBalance[] = [{ year: curYear, balance: vals.currentPrincipal! }];
    for (let i = 1; i < vals.yearsToGrow! + 1; i++) {
      balYears.push({ year: curYear + i, balance: this.runCalculation(vals) });
      vals.currentPrincipal = balYears[i].balance;
    }
    this.store.dispatch(new UpsertResult(vals.id, { ...vals, results: balYears }));
  }

  removeCalculationsForLeg(legId: number) {
    this.store.dispatch(new RemoveResult(legId));
  }

  reset() {
    this.store.dispatch(new ResetResults());
  }

  private getYear(vals: CompoundInterestCalculation): number {
    let curYear = (new Date()).getFullYear();
    const parentLeg = this.legService.getParent(vals.id);
    if (parentLeg !== undefined) {
      const prevEnt = this.store.selectSnapshot(CompoundInterestResultState.getResultById(parentLeg.id));
      if (prevEnt !== undefined) {
        curYear = prevEnt.results[prevEnt.results.length - 1].year;
      }
    }
    return curYear;
  }

  private runCalculation(vls: CompoundInterestCalculation): number {
    const percent = 1 + (vls.interestRate! / 100);
    const endBalance = vls.currentPrincipal! * percent;
    const val = endBalance + vls.annualAddition!;
    return Math.round(val * 100) / 100;
  }

  private getYears(data: CompoundInterestResult[]) {
    const years: number[] = [];
    data.forEach((row) => {
      row.results.forEach((year) => {
        if (!years.includes(year.year)) {
          years.push(year.year);
        }
      });
    });
    return years.sort();
  }

  private getDatasets(results: CompoundInterestResult[]) {
    return results.map((row) => {
      const label = `Simulation ${row.id}`;
      const data: { x: number; y: number }[] = row.results.map((dt) => ({
        x: dt.year,
        y: dt.balance
      }));
      return { label, data };
    });
  }
}
