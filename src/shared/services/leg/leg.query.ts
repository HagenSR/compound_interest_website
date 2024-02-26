import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { LegState } from './leg.state';
import { LegStore } from './leg.store';

@Injectable({
  providedIn: 'root'
})
export class LegQuery extends QueryEntity<LegState> {
  constructor(protected override store: LegStore) {
    super(store);
  }
}