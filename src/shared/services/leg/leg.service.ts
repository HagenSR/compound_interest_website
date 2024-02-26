import { Injectable } from '@angular/core';
import { LegStore } from './leg.store';
import { LegQuery } from './leg.query';
import { Leg } from 'src/shared/models/leg';

@Injectable({ providedIn: 'root' })
export class LegService {

  private curLegId = 0;

  private parentMap: Map<number, number | undefined> = new Map()

  constructor(private readonly store: LegStore,
    public readonly query: LegQuery) {
  }

  addLeg(leg: Leg) {
    const newLeg = { ...leg, id: this.curLegId }
    this.store.add(newLeg)
    this.updateParentMap(newLeg);
    this.curLegId++
  }

  resetLegsForSimulation(simId: number) {
    this.query.getAll().filter((leg) => leg.simulationId = simId).forEach((leg) => this.store.remove(leg.id));
    this.store.add({ id: this.curLegId++, simulationId: simId })
  }

  reset() {
    this.store.reset()
  }

  getParent(id: number) {
    return this.query.getEntity(this.parentMap.get(id) ?? -1)
  }

  private updateParentMap(leg: Leg) {
    const prev = this.query.getAll().find((pLeg) => pLeg.id !== leg.id && pLeg.simulationId === leg.simulationId && !this.getParent(pLeg.id))?.id
    this.parentMap.set(leg.id, prev);
  }
}
