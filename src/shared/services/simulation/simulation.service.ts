import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LegService } from '../leg/leg.service';
import { AddSimulation, ResetSimulations } from './simulation.actions';

@Injectable({ providedIn: 'root' })
export class SimulationService {

  private curSimId = 0;

  constructor(private readonly store: Store,
    private readonly legService: LegService) {
    this.addSimulation();
  }

  addSimulation() {
    this.legService.addLeg({ id: 0, simulationId: this.curSimId });
    this.store.dispatch(new AddSimulation({ id: this.curSimId }));
    this.curSimId += 1;
  }

  reset() {
    this.store.dispatch(new ResetSimulations());
    this.addSimulation();
  }
}
