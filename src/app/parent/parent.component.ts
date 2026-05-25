import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from "./settings/settings.component";
import { SimulationService } from 'src/shared/services/simulation/simulation.service';
import { SimulationComponent } from "./simulation/simulation.component";
import { delay, Observable, takeUntil, tap } from 'rxjs';
import { OnDestroyComponent } from 'src/shared/ui/subscriber-base-component';
import { ResultsComponent } from './results/results.component';
import { Select } from '@ngxs/store';
import { SimulationState } from 'src/shared/services/simulation/simulation.state';
import { Simulation } from 'src/shared/models/simulation';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.scss',
    imports: [CommonModule, SettingsComponent, SimulationComponent, ResultsComponent]
})
export class ParentComponent extends OnDestroyComponent implements OnInit {

  @Select(SimulationState.getAllSimulations) sims$!: Observable<Simulation[]>

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
