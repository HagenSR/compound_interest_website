import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { CompoundInterestResult } from 'src/shared/models/compound-interest-result.model';
import { UpsertResult, RemoveResult, ResetResults } from './compound-interest-result.actions';

export interface CompoundInterestResultStateModel {
  results: CompoundInterestResult[];
}

@State<CompoundInterestResultStateModel>({
  name: 'compoundInterestResults',
  defaults: { results: [] }
})
@Injectable()
export class CompoundInterestResultState {

  @Selector()
  static getAllResults(state: CompoundInterestResultStateModel): CompoundInterestResult[] {
    return state.results;
  }

  static getResultById(id: number) {
    return createSelector([CompoundInterestResultState], (state: CompoundInterestResultStateModel) =>
      state.results.find(r => r.id === id)
    );
  }

  @Action(UpsertResult)
  upsertResult(ctx: StateContext<CompoundInterestResultStateModel>, action: UpsertResult) {
    const state = ctx.getState();
    const idx = state.results.findIndex(r => r.id === action.id);
    if (idx >= 0) {
      const updated = [...state.results];
      updated[idx] = { ...state.results[idx], ...action.result, id: action.id } as CompoundInterestResult;
      ctx.patchState({ results: updated });
    } else {
      ctx.patchState({ results: [...state.results, { ...action.result, id: action.id } as CompoundInterestResult] });
    }
  }

  @Action(RemoveResult)
  removeResult(ctx: StateContext<CompoundInterestResultStateModel>, action: RemoveResult) {
    ctx.patchState({ results: ctx.getState().results.filter(r => r.id !== action.id) });
  }

  @Action(ResetResults)
  resetResults(ctx: StateContext<CompoundInterestResultStateModel>) {
    ctx.setState({ results: [] });
  }
}
