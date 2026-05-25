import { Component, Input, OnInit, inject } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, filter, map, tap, startWith, Subscription, delay, takeUntil } from 'rxjs';
import { CompoundInterestCalculation } from 'src/shared/models/compound-interest-calculation.model';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { OnDestroyComponent } from 'src/shared/ui/subscriber-base-component';
import { Leg } from 'src/shared/models/leg';
import { PanelModule } from 'primeng/panel';
import { LegService } from 'src/shared/services/leg/leg.service';
import { Store } from '@ngxs/store';
import { CompoundInterestResultState } from 'src/shared/services/compound-interest/compound-interest-result.state';

@Component({
    selector: 'app-compound-interest-leg',
    imports: [InputNumberModule, CardModule, FloatLabelModule, ReactiveFormsModule, AsyncPipe, CurrencyPipe, PanelModule],
    templateUrl: './compound-interest-leg.component.html',
    styleUrl: './compound-interest-leg.component.scss'
})
export class CompoundInterestLegComponent extends OnDestroyComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private compoundService = inject(CompoundInterestService);
  private legService = inject(LegService);
  private readonly store = inject(Store);


  @Input() leg!: Leg
  @Input() index!: number

  form = this.formBuilder.group({
    currentPrincipal: undefined,
    annualAddition: undefined,
    yearsToGrow: undefined,
    interestRate: undefined
  })
  header = 'Leg '

  resultingValue$!: Observable<number | undefined>
  runCalc$!: Subscription

  ngOnInit(): void {
    this.header += this.index + 1
    this.resultingValue$ = this.store.select(CompoundInterestResultState.getResultById(this.leg.id)).pipe(
      map((result) => result?.results[result.results.length - 1]?.balance),
    )

    const parent = this.legService.getParent(this.leg.id)
    if (parent !== undefined) {
      this.store.select(CompoundInterestResultState.getResultById(parent.id)).pipe(
        takeUntil(this.destroyed$),
        delay(0),
        startWith(this.store.selectSnapshot(CompoundInterestResultState.getResultById(parent.id))),
        tap((prevEnt) => {
          this.form.get('currentPrincipal')?.setValue(prevEnt?.results[prevEnt?.results.length - 1].balance)
          this.form.get('currentPrincipal')?.disable()
        })
      ).subscribe()
    }

    this.runCalc$ = this.form.valueChanges.pipe(
      delay(0),
      takeUntil(this.destroyed$),
      map(() => this.form.getRawValue()),
      map((formFields) => Object.keys(formFields)
        .reduce((acc, field) => acc && formFields[field as keyof typeof formFields] !== null, true)),
      filter((bool) => bool),
      tap(() => this.compoundService.runCalculationEveryYear({ ...this.form.getRawValue(), id: this.leg.id } as CompoundInterestCalculation))
    ).subscribe()
  }
}
