# KalkulaPH reviewed rate manifest

`rates-v1.json` is the public reviewed-rate feed used by compatible KalkulaPH builds.

## Annual / rule-change refresh process

1. Check the newest official publications from SSS, PhilHealth, Pag-IBIG Fund and BIR.
2. Update only parameters confirmed by an official source.
3. Change `id`, `verifiedOn` and `effectiveFrom` as appropriate.
4. Keep `schema` at `1` unless the mobile app is updated to support a new schema.
5. Commit the JSON. GitHub Pages publishes the file at `/kalkulaph/rates-v1.json`.
6. In KalkulaPH Settings, tap **Check for rate updates** and verify the new rate-set ID/date.
7. Run calculator regression checks before relying on a changed formula or threshold.

The app validates ranges and relationships before accepting a remote manifest, caches the last valid copy, and falls back to built-in reviewed rates when offline or when a manifest is invalid.

Never use this file to change formulas that the installed app does not understand. Formula changes require an app release.