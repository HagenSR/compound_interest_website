import { Injectable } from '@angular/core';
import { CompoundInterestCalculation } from '../../models/compound-interest-calculation.model';
import { CompoundInterestResultStore } from './compound-interest-result.store';
import { CompoundInterestResultQuery } from './compound-interest-result.query';
import { map, tap } from 'rxjs';
import { YearAndBalance } from 'src/shared/models/year-and-balance.model';
import { CompoundInterestResult } from 'src/shared/models/compound-interest-result.model';

@Injectable({ providedIn: 'root' })
export class CompoundInterestService {

  constructor(private readonly store: CompoundInterestResultStore,
    public readonly query: CompoundInterestResultQuery) {
  }

  chartData$ = this.query.selectAll().pipe(
    map((data) => {
      const years = this.getYears(data)
      const datasets = this.getDatasets(data)
      return { labels: years, datasets: datasets }
    }),
    tap((res) => console.log(res))
  )

  runCalculationEveryYear(vals: CompoundInterestCalculation) {
    const curYear = (new Date()).getFullYear()
    const balYears: YearAndBalance[] = [{ year: curYear, balance: vals.currentPrincipal! }]
    for (let i = 1; i < vals.yearsToGrow! + 1; i++) {
      balYears.push({ year: curYear + i, balance: this.runCalculation(vals) })
      vals.currentPrincipal = balYears[i].balance
    }
    this.store.upsert(vals.id, { ...vals, results: balYears })
  }

  private runCalculation(vls: CompoundInterestCalculation): number {
    const percent = 1 + ((vls.interestRate! / 100))
    const endBalance = vls.currentPrincipal! * percent
    return endBalance + vls.annualAddition!
  }

  private getYears(data: CompoundInterestResult[]) {
    const years: number[] = []
    data.forEach((row) => {
      row.results.forEach((year) => {
        if (!years.includes(year.year)) {
          years.push(year.year)
        }
      })
    })
    return years.sort()
  }

  private getDatasets(results: CompoundInterestResult[]) {
    return results.map((row) => {
      const label = `Simulation ${row.id}`
      const data: { x: number, y: number }[] = row.results.map((dt) => {
        return {
          x: dt.year,
          y: dt.balance
        }
      })
      return {
        label,
        data
      }
    })
  }

}
