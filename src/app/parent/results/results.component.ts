import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { TableComponent } from "./table/table.component";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from "./chart/chart.component";

@Component({
    selector: 'app-results',
    standalone: true,
    templateUrl: './results.component.html',
    styleUrl: './results.component.scss',
    imports: [AsyncPipe, CommonModule, TableComponent, ToggleButtonModule, FormsModule, ChartComponent]
})
export class ResultsComponent {

  checked = false

  shouldShow$ = this.compoundService.chartData$.pipe(
    map((data) => Boolean(data) && data.datasets.length > 0)
  )

  constructor(private compoundService: CompoundInterestService) {
  }
}
