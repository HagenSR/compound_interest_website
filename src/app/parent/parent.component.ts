import { Component } from '@angular/core';
import { CompoundInterestLegComponent } from './compound-interest-leg/compound-interest-leg.component';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "./chart/chart.component";
import { SettingsComponent } from "./settings/settings.component";
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';

@Component({
  selector: 'app-parent',
  standalone: true,
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  imports: [CompoundInterestLegComponent, CommonModule, ChartComponent, SettingsComponent]
})
export class ParentComponent {

  ids$ = this.compoundService.simulationIds$

  constructor(private compoundService: CompoundInterestService) {
  }
}
