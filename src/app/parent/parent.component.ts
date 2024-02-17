import { Component } from '@angular/core';
import { CompoundInterestLegComponent } from './compound-interest-leg/compound-interest-leg.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "./chart/chart.component";
import { DropdownModule } from 'primeng/dropdown';
import { ModeService } from 'src/shared/services/mode/mode.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent',
  standalone: true,
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  imports: [CompoundInterestLegComponent, CommonModule, ButtonModule, ChartComponent, DropdownModule, ReactiveFormsModule]
})
export class ParentComponent {

  ids = [1]
  options = this.modeService.options
  modeForm = this.modeService.form
  private curId = 2;

  constructor(public readonly modeService: ModeService){
  }

  addSimulation() {
    this.ids.push(this.curId)
    this.curId += 1
  }

}
