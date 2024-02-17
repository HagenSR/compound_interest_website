import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs';
import { CompoundInterestCalculation } from 'src/shared/models/compound-interest-calculation.model';
import { CompoundInterestService } from 'src/shared/compound-interest.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-compound-interest-leg',
  standalone: true,
  imports: [InputNumberModule, CardModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './compound-interest-leg.component.html',
  styleUrl: './compound-interest-leg.component.scss'
})
export class CompoundInterestLegComponent {

  form = this.formBuilder.group({
    currentPrincipal: undefined,
    annualAddition: undefined,
    yearsToGrow: undefined,
    interestRate: undefined
  })

  resultingValues$  = this.form.valueChanges.pipe(
    map((formFields) => Object.keys(formFields).reduce((acc, field) => acc && Boolean(formFields[field as keyof typeof formFields]), true)),
    map((bool) => bool ? this.compoundService.runCalculationEveryYear(this.form.value as CompoundInterestCalculation) : undefined)
  )

  resultingValue$ = this.resultingValues$.pipe(
    filter((arr) => arr !== undefined),
    map((arr) => arr![arr!.length - 1])
  )

  constructor(private readonly formBuilder: FormBuilder, private compoundService: CompoundInterestService){

  }

}
