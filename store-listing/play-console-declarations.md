# KalkulaPH Play Console declaration draft

Prepared for KalkulaPH Android package `ph.kalkula.app`. Confirm the final choices against the exact Play Console wording and the fresh release bundle before submission.

## App content

### Privacy policy

Use:
`https://github.com/erwinmehehe/kalkulaph/blob/main/PRIVACY.md`

### Ads

**Does your app contain ads?** No.

KalkulaPH does not include an advertising SDK or display ads.

### App access

**Is any part of the app restricted?** No.

No account, login, membership, invite code, employer account, reviewer credential, payment, OTP, biometric gate or special access is required.

### Target audience and content

Recommended target audience: **18 and over**.

The app is designed for employees, freelancers, self-employed workers, and adults estimating Philippine pay, statutory contributions, taxes, benefits, pensions and retirement projections. It is not designed for children.

### Financial features

Recommended declaration for the policy-safe calculator build: **My app doesn't provide any financial features**.

Rationale: KalkulaPH performs user-directed calculations and displays numeric estimates only. It does not provide banking, lending, payments, money transfer, insurance, securities or cryptocurrency services, portfolio management, credit monitoring, or personalized financial advice. The retirement tool no longer assigns readiness scores, recommendations, or labels such as "On track" or "Needs attention."

If Play review interprets calculator-only functionality differently, use the review feedback to amend the declaration rather than adding advice or regulated financial-service behavior to the app.

### Government apps

**Is this app developed by or on behalf of a government?** No.

KalkulaPH must remain clearly described as an independent calculator and not an official SSS, PhilHealth, Pag-IBIG, BIR, DOLE, NWPC, or Philippine government application.

### Health apps

Recommended declaration for the policy-safe calculator build: **My app doesn't provide any health features**.

The previous PhilHealth coverage lookup and medical-package guide were removed. The remaining PhilHealth functionality is limited to estimating the statutory payroll contribution in the net-pay calculator; the app does not provide medical information, diagnosis, treatment guidance, health tracking, patient management, health-insurance navigation, or medical decision support.

### Permissions

The app does not request contacts, location, camera, microphone, SMS, call log, storage/media, or advertising ID permissions in its current configuration.

## Data safety

Use `store-listing/data-safety.md` as the working declaration.

Current implementation summary:

- Salary and calculator inputs are processed locally on the device.
- Job history is stored locally using device storage.
- No KalkulaPH account is created.
- No analytics, advertising, cloud-sync, or crash-reporting SDK is intentionally included.
- The optional rates refresh fetches a public HTTPS JSON file from GitHub and does not intentionally transmit salary, job-history, or calculator-input data.
- Local app data can be cleared from KalkulaPH Settings, Android app storage settings, or by uninstalling the app.

Before submitting Data safety, compare this declaration with Google Play App Bundle Explorer's detected SDKs and data practices.

## Store presence

- App name: **KalkulaPH: Salary Calculator**
- Category recommendation: **Finance**
- App type: App
- Pricing: Free
- Contains ads: No
- Privacy policy: public GitHub privacy policy above
- Support email: **must be entered in Play Console by the developer account owner**

## Release path

1. Build a fresh signed production App Bundle after the policy-safe feature cleanup.
2. Upload the fresh bundle to **Internal testing** first.
3. Review automated Play checks and the pre-launch report.
4. Complete the store listing and all App content declarations using the fresh build's actual behavior.
5. Run the required closed test with at least 12 continuously opted-in testers for at least 14 days before applying for production access, as shown by this Play developer account.
6. Promote only after QA and policy checks are clear.

## Build requirements

- Package: `ph.kalkula.app`
- Target API: `36`
- Do not submit the previous build 13 because it contains the removed readiness-score and PhilHealth coverage-guide functionality.
