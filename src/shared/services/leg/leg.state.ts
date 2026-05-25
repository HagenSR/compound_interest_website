import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { Leg } from 'src/shared/models/leg';
import { AddLeg, RemoveLeg, RemoveLegsForSimulation, ResetLegs } from './leg.actions';

export interface LegStateModel {
  legs: Leg[];
}

@State<LegStateModel>({
  name: 'legs',
  defaults: { legs: [] }
})
@Injectable()
export class LegState {

  @Selector()
  static getAllLegs(state: LegStateModel): Leg[] {
    return state.legs;
  }

  static getLegById(id: number) {
    return createSelector([LegState], (state: LegStateModel) =>
      state.legs.find(l => l.id === id)
    );
  }

  static getLegsBySimulationId(simulationId: number) {
    return createSelector([LegState], (state: LegStateModel) =>
      state.legs.filter(l => l.simulationId === simulationId)
    );
  }

  @Action(AddLeg)
  addLeg(ctx: StateContext<LegStateModel>, action: AddLeg) {
    ctx.patchState({ legs: [...ctx.getState().legs, action.leg] });
  }

  @Action(RemoveLeg)
  removeLeg(ctx: StateContext<LegStateModel>, action: RemoveLeg) {
    ctx.patchState({ legs: ctx.getState().legs.filter(l => l.id !== action.id) });
  }

  @Action(RemoveLegsForSimulation)
  removeLegsForSimulation(ctx: StateContext<LegStateModel>, action: RemoveLegsForSimulation) {
    ctx.patchState({ legs: ctx.getState().legs.filter(l => l.simulationId !== action.simulationId) });
  }

  @Action(ResetLegs)
  resetLegs(ctx: StateContext<LegStateModel>) {
    ctx.setState({ legs: [] });
  }
}
