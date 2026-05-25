import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Simulation } from 'src/shared/models/simulation';
import { AddSimulation, ResetSimulations } from './simulation.actions';

export interface SimulationStateModel {
  simulations: Simulation[];
}

@State<SimulationStateModel>({
  name: 'simulations',
  defaults: { simulations: [] }
})
@Injectable()
export class SimulationState {

  @Selector()
  static getAllSimulations(state: SimulationStateModel): Simulation[] {
    return state.simulations;
  }

  @Action(AddSimulation)
  addSimulation(ctx: StateContext<SimulationStateModel>, action: AddSimulation) {
    ctx.patchState({ simulations: [...ctx.getState().simulations, action.simulation] });
  }

  @Action(ResetSimulations)
  resetSimulations(ctx: StateContext<SimulationStateModel>) {
    ctx.setState({ simulations: [] });
  }
}
