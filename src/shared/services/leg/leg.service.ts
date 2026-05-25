import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Leg } from 'src/shared/models/leg';
import { LegState } from './leg.state';
import { AddLeg, RemoveLeg, RemoveLegsForSimulation, ResetLegs } from './leg.actions';

@Injectable({ providedIn: 'root' })
export class LegService {

  private curLegId = 0;
  private parentMap: Map<number, number | undefined> = new Map();

  constructor(private readonly store: Store) {}

  addLeg(leg: Leg) {
    const newLeg = { ...leg, id: this.curLegId };
    this.store.dispatch(new AddLeg(newLeg));
    this.updateParentMap(newLeg);
    this.curLegId++;
  }

  resetLegsForSimulation(simId: number) {
    this.store.dispatch(new RemoveLegsForSimulation(simId));
    this.store.dispatch(new AddLeg({ id: this.curLegId++, simulationId: simId }));
  }

  reset() {
    this.store.dispatch(new ResetLegs());
  }

  getParent(id: number): Leg | undefined {
    const parentId = this.parentMap.get(id) ?? -1;
    return this.store.selectSnapshot(LegState.getLegById(parentId));
  }

  private updateParentMap(leg: Leg) {
    const prev = this.store.selectSnapshot(LegState.getAllLegs)
      .sort((a, b) => b.id - a.id)
      .find(pLeg => pLeg.id !== leg.id && pLeg.simulationId === leg.simulationId)?.id;
    this.parentMap.set(leg.id, prev);
  }
}
