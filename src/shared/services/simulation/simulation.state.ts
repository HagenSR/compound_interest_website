import { EntityState } from "@datorama/akita";
import { Simulation } from "src/shared/models/simulation";

export interface SimulationState extends EntityState<Simulation, number> { }