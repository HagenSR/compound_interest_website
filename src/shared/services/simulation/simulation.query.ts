import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SimulationState } from './simulation.state';
import { SimulationStore } from './simulation.store';

@Injectable({
  providedIn: 'root'
})
export class SimulationQuery extends QueryEntity<SimulationState> {
  constructor(protected override store: SimulationStore) {
    super(store);
  }
}