import { Injectable } from '@angular/core';
import { CompoundInterestCalculation } from '../../models/compound-interest-calculation.model';
import { CompoundInterestResultStore } from './compound-interest-result.store';
import { CompoundInterestResultQuery } from './compound-interest-result.query';
import { BehaviorSubject, map } from 'rxjs';
import { YearAndBalance } from 'src/shared/models/year-and-balance.model';
import { CompoundInterestResult } from 'src/shared/models/compound-interest-result.model';
import { ModeService } from '../mode/mode.service';
import { Mode } from 'src/shared/enums/mode.enum';

@Injectable({ providedIn: 'root' })
export class CompoundInterestService {

  simulationIds$ = new BehaviorSubject([1])
  private curId = 2

  constructor(private readonly store: CompoundInterestResultStore,
    public readonly query: CompoundInterestResultQuery,
    private readonly modeService: ModeService) {
  }

  chartData$ = this.query.selectAll().pipe(
    map((data) => {
      const years = this.getYears(data)
      const datasets = this.getDatasets(data)
      return { labels: years, datasets: datasets }
    })
  )

  runCalculationEveryYear(vals: CompoundInterestCalculation) {
    const curYear = this.getYear(vals)
    const balYears: YearAndBalance[] = [{ year: curYear, balance: vals.currentPrincipal! }]
    for (let i = 1; i < vals.yearsToGrow! + 1; i++) {
      balYears.push({ year: curYear + i, balance: this.runCalculation(vals) })
      vals.currentPrincipal = balYears[i].balance
    }
    this.store.upsert(vals.id, { ...vals, results: balYears })
  }

  addSimulation() {
    const curIds = this.simulationIds$.value
    curIds.push(this.curId)
    this.curId += 1
    this.simulationIds$.next(curIds)
  }

  reset() {
    this.store.reset()
    this.simulationIds$.next([this.curId++])
  }

  private getYear(vals: CompoundInterestCalculation): number {
    let curYear = (new Date()).getFullYear()
    if (this.modeService.currentMode$.value === Mode.LEG && vals.id > 1) {
      const prevEnt = this.query.getEntity(vals.id - 1)
      curYear = prevEnt!.results[prevEnt!.results.length - 1].year!
    }
    return curYear;
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
