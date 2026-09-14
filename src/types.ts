export type EmploymentMode = 'employee' | 'freelancer';
export type TaxMethod = 'graduated' | 'eightPercent';

export interface RateConfig {
  schemaVersion: 1;
  effectiveYear: number;
  verifiedOn: string;
  sss: { minMsc: number; maxMsc: number; step: number; employeeRate: number; totalRate: number };
  philHealth: { rate: number; minSalary: number; maxSalary: number; employeeShare: number };
  pagIbig: { employeeRateLow: number; employeeRate: number; employerRate: number; threshold: number; maxFundSalary: number };
  tax: { annualBrackets: Array<{ over: number; base: number; rate: number }> };
  freelancer: { eightPercentExemption: number; percentageTaxRate: number };
  deMinimis: Record<string, number>;
  sources: string[];
}

export interface JobEntry { id: string; employer: string; role: string; monthlyGross: number; start: string; end?: string; active: boolean }
export interface RetirementInput { age: number; retirementAge: number; currentSavings: number; monthlySavings: number; desiredMonthlyIncome: number; expectedReturn: number; inflation: number }
