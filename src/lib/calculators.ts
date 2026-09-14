import type { RateConfig, RetirementInput } from '../types';

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : 0));
export const money = (n: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 2 }).format(n || 0);

export function annualTax(taxable: number, rates: RateConfig) {
  const brackets = rates.tax.annualBrackets;
  let selected = brackets[0];
  for (const bracket of brackets) if (taxable > bracket.over) selected = bracket;
  return Math.max(0, selected.base + (taxable - selected.over) * selected.rate);
}

export function employeeContributions(monthlyGross: number, rates: RateConfig, philHealthBasicSalary = monthlyGross) {
  const gross = Math.max(0, monthlyGross);
  const msc = clamp(Math.round(gross / rates.sss.step) * rates.sss.step, rates.sss.minMsc, rates.sss.maxMsc);
  const sss = gross ? msc * rates.sss.employeeRate : 0;
  const basicSalary = gross ? clamp(philHealthBasicSalary, 0, gross) : 0;
  const philHealthBase = basicSalary ? clamp(basicSalary, rates.philHealth.minSalary, rates.philHealth.maxSalary) : 0;
  const philHealth = philHealthBase * rates.philHealth.rate * rates.philHealth.employeeShare;
  const pagIbigBase = Math.min(gross, rates.pagIbig.maxFundSalary);
  const pagIbig = pagIbigBase * (gross <= rates.pagIbig.threshold ? rates.pagIbig.employeeRateLow : rates.pagIbig.employeeRate);
  return { sss, philHealth, pagIbig, total: sss + philHealth + pagIbig };
}

export function netPay(monthlyGross: number, rates: RateConfig, nonTaxableMonthly = 0, philHealthBasicSalary = Math.max(0, monthlyGross - nonTaxableMonthly)) {
  const contributions = employeeContributions(monthlyGross, rates, philHealthBasicSalary);
  const taxableMonthly = Math.max(0, monthlyGross - contributions.total - nonTaxableMonthly);
  const tax = annualTax(taxableMonthly * 12, rates) / 12;
  return { gross: monthlyGross, contributions, tax, nonTaxableMonthly, net: Math.max(0, monthlyGross - contributions.total - tax) };
}

export function freelancerTax(annualRevenue: number, annualExpenses: number, method: 'graduated' | 'eightPercent', rates: RateConfig) {
  const revenue = Math.max(0, annualRevenue);
  const expenses = clamp(annualExpenses, 0, revenue);
  const incomeTax = method === 'eightPercent'
    ? Math.max(0, revenue - rates.freelancer.eightPercentExemption) * 0.08
    : annualTax(Math.max(0, revenue - expenses), rates);
  const percentageTax = method === 'eightPercent' ? 0 : revenue * rates.freelancer.percentageTaxRate;
  return { revenue, expenses, incomeTax, percentageTax, totalTax: incomeTax + percentageTax, takeHome: revenue - expenses - incomeTax - percentageTax };
}

export function thirteenthMonthAndBenefits(basicEarned: number, benefits: Record<string, number>, rates: RateConfig) {
  const thirteenthMonth = Math.max(0, basicEarned) / 12;
  const allowed = Object.entries(benefits).reduce((sum, [key, value]) => sum + Math.min(Math.max(0, value), rates.deMinimis[key] ?? 0), 0);
  const excess = Object.entries(benefits).reduce((sum, [key, value]) => sum + Math.max(0, value - (rates.deMinimis[key] ?? 0)), 0);
  const otherBenefitsTaxable = Math.max(0, thirteenthMonth + excess - 90000);
  return { thirteenthMonth, deMinimisExempt: allowed, excessBenefits: excess, otherBenefitsTaxable };
}

export function pensionEstimate(monthlySalaryCredit: number, creditedYears: number) {
  const amsc = Math.max(0, monthlySalaryCredit);
  const years = Math.max(0, creditedYears);
  const options = [300 + 0.2 * amsc + 0.02 * amsc * Math.max(0, years - 10), 0.4 * amsc, 1200];
  return years >= 10 ? Math.max(...options) : 0;
}

export function retirementProjection(input: RetirementInput) {
  const years = Math.max(0, input.retirementAge - input.age);
  const months = years * 12;
  const monthlyRate = input.expectedReturn / 100 / 12;
  const savingsFuture = input.currentSavings * Math.pow(1 + monthlyRate, months);
  const contributionsFuture = monthlyRate ? input.monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : input.monthlySavings * months;
  const projected = savingsFuture + contributionsFuture;
  const desiredAtRetirement = input.desiredMonthlyIncome * Math.pow(1 + input.inflation / 100, years);
  const target = desiredAtRetirement * 12 * 25;
  const funded = target ? projected / target : 0;
  const score = Math.round(clamp(funded * 100, 0, 100));
  return { projected, target, funded, score, desiredAtRetirement };
}

export function rateConversions(monthly: number, workdays = 261) {
  const daily = Math.max(0, monthly) * 12 / Math.max(1, workdays);
  return { daily, hourly: daily / 8 };
}

export function overtimePay(monthly: number, hours: number, multiplier = 1.25) {
  return rateConversions(monthly).hourly * Math.max(0, hours) * Math.max(0, multiplier);
}

export function holidayPay(monthly: number, days: number, multiplier: 2 | 1.3) {
  return rateConversions(monthly).daily * Math.max(0, days) * multiplier;
}

export function finalPayEstimate(unpaidSalary: number, basicEarned: number, leaveDays: number, monthly: number, other = 0) {
  const proratedThirteenth = Math.max(0, basicEarned) / 12;
  const leaveConversion = rateConversions(monthly).daily * Math.max(0, leaveDays);
  return { proratedThirteenth, leaveConversion, total: Math.max(0, unpaidSalary) + proratedThirteenth + leaveConversion + Math.max(0, other) };
}

export function mp2Projection(monthly: number, years: number, annualDividend = 0.065, initial = 0) {
  const months = Math.max(0, years) * 12;
  const monthlyRate = Math.max(0, annualDividend) / 12;
  const deposits = monthlyRate ? Math.max(0, monthly) * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : Math.max(0, monthly) * months;
  return Math.max(0, initial) * Math.pow(1 + monthlyRate, months) + deposits;
}

export function maternityEstimate(topSixMscTotal: number, days: 60 | 78 | 105 | 120) {
  const averageDailySalaryCredit = Math.max(0, topSixMscTotal) / 180;
  return { averageDailySalaryCredit, benefit: averageDailySalaryCredit * days };
}
