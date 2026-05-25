import { Simulation } from 'src/shared/models/simulation';

export class AddSimulation {
  static readonly type = '[Simulation] Add';
  constructor(public simulation: Simulation) {}
}

export class ResetSimulations {
  static readonly type = '[Simulation] Reset';
}
