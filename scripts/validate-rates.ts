import rates from '../src/data/rates-2026.json';
const valid = rates.schemaVersion === 1 && Number.isInteger(rates.effectiveYear) &&
  rates.effectiveYear >= 2026 && rates.sss.employeeRate > 0 && rates.philHealth.rate > 0 &&
  rates.tax.annualBrackets.length >= 6 && Array.isArray(rates.sources) && rates.sources.length >= 4;
if (!valid) throw new Error('Bundled rate table is invalid');
console.log(`Rate table valid: ${rates.effectiveYear}, verified ${rates.verifiedOn}, ${rates.sources.length} official source links`);
