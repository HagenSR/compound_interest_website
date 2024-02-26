import { EntityState } from "@datorama/akita";
import { Leg } from "src/shared/models/leg";

export interface LegState extends EntityState<Leg, number> { }