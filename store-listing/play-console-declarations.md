# KalkulaPH Play Console declaration draft

Prepared for KalkulaPH 3.0.0 (Android package `ph.kalkula.app`). Confirm the final choices against the App Bundle Explorer and the exact Play Console wording before submission.

## App content

### Privacy policy

Use:
`https://github.com/erwinmehehe/kalkulaph/blob/main/PRIVACY.md`

### Ads

**Does your app contain ads?** No.

KalkulaPH does not include an advertising SDK or display ads.

### App access

**Is all functionality available without special access?** Yes.

No account, login, membership, invite code, employer account, or reviewer credential is required.

### Target audience and content

Recommended target audience: **18 and over**.

The app is designed for employees, freelancers, self-employed workers, and adults estimating Philippine pay, statutory contributions, taxes, benefits, and retirement readiness. It is not designed for children.

### Financial features

Recommended declaration: **Other**.

Description for review:

> KalkulaPH is an informational calculator for Philippine salary, withholding tax, statutory SSS/PhilHealth/Pag-IBIG contributions, benefits, 13th-month pay, freelancer estimates, pension projection, and retirement-readiness estimates. It does not provide loans, banking, payment processing, money transfer, insurance, securities or cryptocurrency trading, investment management, or personalized financial advice. Results are estimates and users are directed to official government sources for authoritative rules.

Using **Other** is intentionally conservative because the app contains salary, tax, pension, and retirement-related calculations even though it does not provide regulated financial products or personalized financial advice.

### Government apps

**Is this an official government app?** No.

KalkulaPH must remain clearly described as an independent calculator and not an official SSS, PhilHealth, Pag-IBIG, BIR, or Philippine government application.

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

1. Upload build 13 to **Internal testing** first.
2. Review automated Play checks and the pre-launch report.
3. Complete the store listing and all App content declarations.
4. If the developer account is a personal account created after November 13, 2023, run the required closed test with at least 12 continuously opted-in testers for at least 14 days before applying for production access.
5. Promote only after QA and policy checks are clear.

## Build being submitted

- App version: `3.0.0`
- Android build/version code: `13`
- Package: `ph.kalkula.app`
- EAS build ID: `616b98a0-a7a1-4165-b10c-69a0c7680112`
- Target API: `36`
