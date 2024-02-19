import { EntityStore, StoreConfig } from '@datorama/akita';
import { CompoundInterestResultState } from './compound-interest-result.state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class CompoundInterestResultStore extends EntityStore<CompoundInterestResultState> {
  constructor() {
    super({})
  }
}