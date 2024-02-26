import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LegState } from './leg.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class LegStore extends EntityStore<LegState> {
  constructor() {
    super({})
  }
}