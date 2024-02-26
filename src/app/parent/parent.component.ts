import { Component } from '@angular/core';
import { CompoundInterestLegComponent } from './simulation/compound-interest-leg/compound-interest-leg.component';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "./chart/chart.component";
import { SettingsComponent } from "./settings/settings.component";
import { SimulationService } from 'src/shared/services/simulation/simulation.service';
import { SimulationComponent } from "./simulation/simulation.component";

@Component({
    selector: 'app-parent',
    standalone: true,
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.scss',
    imports: [CompoundInterestLegComponent, CommonModule, ChartComponent, SettingsComponent, SimulationComponent]
})
export class ParentComponent {

  sims$ = this.simulationService.query.selectAll()

  constructor(private simulationService: SimulationService) {
  }
}
