import { Injectable } from '@angular/core';
import { SimulationStore } from './simulation.store';
import { SimulationQuery } from './simulation.query';
import { LegService } from '../leg/leg.service';

@Injectable({ providedIn: 'root' })
export class SimulationService {

  private curSimId = 0;

  constructor(private readonly store: SimulationStore,
    private readonly legService: LegService,
    public readonly query: SimulationQuery) {
      this.addSimulation()
  }

  addSimulation() {
    this.legService.addLeg({id: 0, simulationId: this.curSimId})
    this.store.add({ id: this.curSimId })
    this.curSimId += 1
  }

  reset() {
    this.store.reset()
    this.addSimulation()
  }

}
