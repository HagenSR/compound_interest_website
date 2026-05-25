import { CompoundInterestResult } from 'src/shared/models/compound-interest-result.model';

export class UpsertResult {
  static readonly type = '[CompoundInterestResult] Upsert';
  constructor(public id: number, public result: Partial<CompoundInterestResult>) {}
}

export class RemoveResult {
  static readonly type = '[CompoundInterestResult] Remove';
  constructor(public id: number) {}
}

export class ResetResults {
  static readonly type = '[CompoundInterestResult] Reset';
}
