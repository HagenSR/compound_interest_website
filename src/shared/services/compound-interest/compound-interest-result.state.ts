import { EntityState } from "@datorama/akita";
import { CompoundInterestResult } from "src/shared/models/compound-interest-result.model";

export interface CompoundInterestResultState extends EntityState<CompoundInterestResult, number> { }