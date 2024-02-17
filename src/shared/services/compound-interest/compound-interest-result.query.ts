import { QueryEntity } from '@datorama/akita';
import { CompoundInterestResultStore } from './compound-interest-result.store';
import { CompoundInterestResultState } from './compound-interest-result.state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompoundInterestResultQuery extends QueryEntity<CompoundInterestResultState> {
  constructor(protected override store: CompoundInterestResultStore) {
    super(store);
  }
}