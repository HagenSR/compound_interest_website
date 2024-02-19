import { Component, Input, OnInit } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, filter, map, tap, combineLatestWith, startWith, Subscription } from 'rxjs';
import { CompoundInterestCalculation } from 'src/shared/models/compound-interest-calculation.model';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ModeService } from 'src/shared/services/mode/mode.service';
import { Mode } from 'src/shared/enums/mode.enum';

@Component({
  selector: 'app-compound-interest-leg',
  standalone: true,
  imports: [InputNumberModule, CardModule, ReactiveFormsModule, AsyncPipe, CurrencyPipe],
  templateUrl: './compound-interest-leg.component.html',
  styleUrl: './compound-interest-leg.component.scss'
})
export class CompoundInterestLegComponent implements OnInit {

  @Input() id!: number

  form = this.formBuilder.group({
    currentPrincipal: undefined,
    annualAddition: undefined,
    yearsToGrow: undefined,
    interestRate: undefined
  })
  header = 'Compounding Interest Simulation '

  resultingValue$!: Observable<number | undefined>
  runCalc$!: Subscription


  constructor(private readonly formBuilder: FormBuilder,
    private compoundService: CompoundInterestService,
    public modeService: ModeService) {
  }
  ngOnInit(): void {
    this.header += this.id
    this.resultingValue$ = this.compoundService.query.selectEntity(this.id).pipe(
      map((result) => result?.results[result?.results.length - 1]?.balance)
    );

    this.modeService!.currentMode$!.pipe(
      startWith(this.modeService.currentMode$.value),
      filter(() => this.id !== 1),
      combineLatestWith(this.compoundService.query.selectEntity(this.id - 1)),
      tap(([mode, prevEnt]) => {
        if (mode === Mode.LEG) {
          this.form.get('currentPrincipal')?.setValue(prevEnt?.results[prevEnt?.results.length - 1].balance)
          this.form.get('currentPrincipal')?.disable()
        } else {
          this.form.get('currentPrincipal')?.enable()
        }
      })
    ).subscribe()

    this.runCalc$ = this.form.valueChanges.pipe(
      map(() => this.form.getRawValue()),
      map((formFields) => Object.keys(formFields)
        .reduce((acc, field) => acc && formFields[field as keyof typeof formFields] !== null, true)),
      filter((bool) => bool),
      tap(() => this.compoundService.runCalculationEveryYear({ ...this.form.getRawValue(), id: this.id } as CompoundInterestCalculation))
    ).subscribe()
  }

}

