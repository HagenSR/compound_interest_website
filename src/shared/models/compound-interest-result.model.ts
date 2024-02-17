import { YearAndBalance } from "./year-and-balance.model";

export interface CompoundInterestResult {
    id: number,
    currentPrincipal: number,
    annualAddition: number,
    yearsToGrow: number,
    interestRate: number,
    results: YearAndBalance[]
}