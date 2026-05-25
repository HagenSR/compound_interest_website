import { Leg } from 'src/shared/models/leg';

export class AddLeg {
  static readonly type = '[Leg] Add';
  constructor(public leg: Leg) {}
}

export class RemoveLeg {
  static readonly type = '[Leg] Remove';
  constructor(public id: number) {}
}

export class RemoveLegsForSimulation {
  static readonly type = '[Leg] Remove For Simulation';
  constructor(public simulationId: number) {}
}

export class ResetLegs {
  static readonly type = '[Leg] Reset';
}
