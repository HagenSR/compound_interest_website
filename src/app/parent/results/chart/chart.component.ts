import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';

@Component({
    selector: 'app-chart',
    imports: [ChartModule, AsyncPipe, CommonModule],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent {
  private compoundService = inject(CompoundInterestService);


  data$ = this.compoundService.chartData$

  options = {
    title: {
      display: true,
      text: 'My Title',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    }
  };
}
