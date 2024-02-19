import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { map } from 'rxjs';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule, AsyncPipe, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  data$ = this.compoundService.chartData$
  shouldShow$ = this.data$.pipe(
    map((data) => Boolean(data) && data.datasets.length > 0)
  )

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

  constructor(private compoundService: CompoundInterestService) {
  }
}
