import { Component, Input, OnInit } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, filter, map, tap } from 'rxjs';
import { CompoundInterestCalculation } from 'src/shared/models/compound-interest-calculation.model';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

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

  runCalc$ = this.form.valueChanges.pipe(
    map((formFields) => Object.keys(formFields).reduce((acc, field) => acc && Boolean(formFields[field as keyof typeof formFields]), true)),
    filter((bool) => bool),
    tap(() => this.compoundService.runCalculationEveryYear({ ...this.form.value, id: this.id } as CompoundInterestCalculation))
  ).subscribe()

  resultingValue$!: Observable<number | undefined>


  constructor(private readonly formBuilder: FormBuilder, private compoundService: CompoundInterestService) {
  }
  ngOnInit(): void {
    this.header += this.id
    this.resultingValue$ = this.compoundService.query.selectEntity(this.id).pipe(
      map((result) => result?.results[result?.results.length - 1]?.balance)
    );
  }

}
