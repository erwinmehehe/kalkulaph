import rates from '../src/data/rates-2025.json';
const valid = rates.schemaVersion === 1 && Number.isInteger(rates.effectiveYear) &&
  rates.effectiveYear >= 2025 && rates.sss.employeeRate > 0 && rates.philHealth.rate > 0 &&
  rates.tax.annualBrackets.length >= 6 && Array.isArray(rates.sources) && rates.sources.length >= 3;
if (!valid) throw new Error('Bundled rate table is invalid');
console.log(`Rate table valid: ${rates.effectiveYear}, ${rates.sources.length} official source links`);
