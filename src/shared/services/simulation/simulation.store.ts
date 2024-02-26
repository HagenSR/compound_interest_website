import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SimulationState } from './simulation.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class SimulationStore extends EntityStore<SimulationState> {
  constructor() {
    super({})
  }
}