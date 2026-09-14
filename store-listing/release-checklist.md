# KalkulaPH release checklist

## Repository and build

- [x] Dedicated repository
- [x] Android package `ph.kalkula.app`
- [x] Android API 36 configuration
- [x] EAS production App Bundle profile
- [x] App icon, adaptive icon, splash and feature graphic
- [x] Automated calculator tests and TypeScript validation
- [ ] Expo account linked and `extra.eas.projectId` added automatically
- [ ] Signed production `.aab` generated
- [ ] Play Console pre-launch report reviewed

## Device QA

- [ ] Install preview APK on a 320–360dp Android phone
- [ ] Test default and 1.3x–1.5x font scaling
- [ ] Test light and dark system appearance
- [ ] Verify keyboard clears every input and modal action
- [ ] Test offline launch and failed rate refresh
- [ ] Test zero, decimal, maximum and malformed values
- [ ] Confirm no crashes, clipped text or blocked navigation

## Store listing

- [x] App name, short description and full description drafted
- [x] Privacy policy and support pages present
- [x] Data Safety draft prepared
- [x] 1024×500 feature graphic prepared
- [ ] Capture real-app phone screenshots
- [ ] Add required support email in Play Console
- [ ] Complete content rating, target audience and ads declarations
- [ ] Verify final SDK data practices in App Bundle Explorer

## Testing and release

- [ ] Upload AAB to internal testing
- [ ] Resolve automated pre-review findings
- [ ] If required, enroll at least 12 closed testers continuously for 14 days
- [ ] Record tester feedback and fixes
- [ ] Apply for production access
- [ ] Use a staged production rollout
