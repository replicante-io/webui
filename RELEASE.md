Releasing Replicante WebUI
==========================

- Manual steps 1:
  - [ ] Bump the version number if needed
  - [ ] Update changelog with version and date
- [ ] Scripted steps 1: `ci/release/prep.sh vX.Y.Z`
  - Ensure dependencies are up to date
  - Ensure tests and CI checks pass
  - Ensure docker image builds correctly
- Manual steps 2:
  - [ ] Git commit and tag release
- [ ] Scripted steps 2: `ci/release/artefacts.sh vX.Y.Z`
  - Build and publish docker image
