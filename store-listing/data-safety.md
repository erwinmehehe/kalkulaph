# Google Play Data Safety draft

Complete this in Play Console only after verifying the final AAB's SDK report.

## Current app behavior

- Data collected: No user data is transmitted to the developer.
- Data shared: No user data is shared with third parties.
- Account creation: None.
- Location: Not requested.
- Contacts, photos, files, advertising ID and device identifiers: Not requested by application code.
- Financial inputs: Salary, job and planning inputs remain on-device in AsyncStorage.
- Network use: The app fetches a public statutory-rate JSON file. Calculator values and saved job records are not included in that request.
- Encryption in transit: The rate request uses HTTPS.
- Deletion: Settings includes “Clear all local data”; users can also clear app storage or uninstall the app.

## Play Console answers to verify

1. Does your app collect or share any required user data types? **No**, if the final SDK report confirms no telemetry or undeclared collection.
2. Is all transmitted data encrypted in transit? **Yes** for the public HTTPS rate request.
3. Can users request deletion? No account or server record exists; on-device data can be deleted from Settings, by clearing app storage, or by uninstalling.
4. Privacy policy URL: `https://github.com/erwinmehehe/kalkulaph/blob/main/PRIVACY.md`

Do not submit this form blindly. Play Console's App Bundle Explorer must be checked for every included SDK first.
