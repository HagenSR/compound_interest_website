import { Component } from '@angular/core';
import { CompoundInterestLegComponent } from './compound-interest-leg/compound-interest-leg.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: 'app-parent',
  standalone: true,
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  imports: [CompoundInterestLegComponent, CommonModule, ButtonModule, ChartComponent]
})
export class ParentComponent {

  ids = [1]
  private curId = 2;

  addSimulation() {
    this.ids.push(this.curId)
    this.curId += 1
  }

}
