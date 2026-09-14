# KalkulaPH v3

Offline-first Philippine salary, tax, benefits and retirement planning app built with Expo React Native.

## Included

- All-in-one monthly net pay: SSS, PhilHealth, Pag-IBIG and withholding-tax estimate
- Freelancer/self-employed estimator with 8% and graduated options
- 13th-month pay and de minimis benefits estimator
- Versioned rate tables with safe remote refresh and offline fallback
- SSS pension projection and PhilHealth coverage guide
- Private multi-employer/job history stored on-device
- Retirement readiness score and long-term fund projection
- Premium mobile UI, safe areas, large touch targets and no account requirement

Payroll processing, payslip generation, employer remittance and employee administration are intentionally excluded.

## Run

```bash
npm install
npm test
npm run typecheck
npm start
```

## Annual rate refresh

1. Copy `src/data/rates-2025.json` to a new year and update only from official issuances.
2. Run `npm run validate:rates` and `npm test`.
3. Update `src/data/rates-2025.json` on `main`, or replace the configured URL with a versioned current-rate file.
4. `expo.extra.ratesUrl` points to this repository. Future valid tables are downloaded automatically, cached locally and checked daily.
5. Keep the bundled table updated in every store release for reliable offline use.

The app rejects malformed or older remote tables. A production backend should additionally sign releases, retain an audit log and use two-person review before publishing statutory changes.

## Important limitations

Results are estimates. Freelancer tax treatment depends on registration, VAT threshold, election and deductions. SSS pension is a simplified projection, while PhilHealth benefits depend on eligibility, accredited facilities and current case-rate rules.
