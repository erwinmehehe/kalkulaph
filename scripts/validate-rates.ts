import rates from '../src/data/rates-2025.json';
import { validRates } from '../src/lib/rates';
if (!validRates(rates)) throw new Error('Bundled rate table is invalid');
console.log(`Rate table valid: ${rates.effectiveYear}, ${rates.sources.length} official source links`);
