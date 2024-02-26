import { Component, Input, OnInit } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, filter, map, tap, startWith, Subscription, delay, takeUntil } from 'rxjs';
import { CompoundInterestCalculation } from 'src/shared/models/compound-interest-calculation.model';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { OnDestroyComponent } from 'src/shared/ui/subscriber-base-component';
import { Leg } from 'src/shared/models/leg';
import { PanelModule } from 'primeng/panel';
import { LegService } from 'src/shared/services/leg/leg.service';

@Component({
  selector: 'app-compound-interest-leg',
  standalone: true,
  imports: [InputNumberModule, CardModule, ReactiveFormsModule, AsyncPipe, CurrencyPipe, PanelModule],
  templateUrl: './compound-interest-leg.component.html',
  styleUrl: './compound-interest-leg.component.scss'
})
export class CompoundInterestLegComponent extends OnDestroyComponent implements OnInit {

  @Input() leg!: Leg
  @Input() index!: number

  form = this.formBuilder.group({
    currentPrincipal: undefined,
    annualAddition: undefined,
    yearsToGrow: undefined,
    interestRate: undefined
  })
  header = 'Compounding Interest Leg '

  resultingValue$!: Observable<number | undefined>
  runCalc$!: Subscription


  constructor(private readonly formBuilder: FormBuilder,
    private compoundService: CompoundInterestService,
    private legService: LegService) {
    super()
  }
  ngOnInit(): void {
    this.header += this.index + 1
    this.resultingValue$ = this.compoundService.query.selectEntity(this.leg.id).pipe(
      map((result) => result?.results[result?.results.length - 1]?.balance),
    );

    const parent = this.legService.getParent(this.leg.id);
    if (parent !== undefined) {
      this.compoundService.query.selectEntity(parent.id).pipe(
        takeUntil(this.destroyed$),
        delay(0),
        startWith(this.compoundService.query.getEntity(parent.id)),
        tap((prevEnt) => {
          this.form.get('currentPrincipal')?.setValue(prevEnt?.results[prevEnt?.results.length - 1].balance)
          this.form.get('currentPrincipal')?.disable()
        }
        )).subscribe()
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

