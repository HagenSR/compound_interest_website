import { Component, OnInit } from '@angular/core';
import { CompoundInterestLegComponent } from './simulation/compound-interest-leg/compound-interest-leg.component';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from "./settings/settings.component";
import { SimulationService } from 'src/shared/services/simulation/simulation.service';
import { SimulationComponent } from "./simulation/simulation.component";
import { delay, takeUntil, tap } from 'rxjs';
import { OnDestroyComponent } from 'src/shared/ui/subscriber-base-component';
import { ResultsComponent } from './results/results.component';

@Component({
    selector: 'app-parent',
    standalone: true,
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.scss',
    imports: [CompoundInterestLegComponent, CommonModule, SettingsComponent, SimulationComponent, ResultsComponent]
})
export class ParentComponent extends OnDestroyComponent implements OnInit {

  sims$ = this.simulationService.query.selectAll()

  constructor(private simulationService: SimulationService) {
    super()
  }

  ngOnInit(): void {
    this.sims$.pipe(
      takeUntil(this.destroyed$),
      delay(100),
      tap(() => {
        const el = document.getElementsByTagName('app-simulation')
        el?.item(el?.length - 1)?.scrollIntoView({ behavior: 'smooth' })
      })
    ).subscribe()
  }


}
