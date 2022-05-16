<!-- markdownlint-disable MD022 MD024 MD032 -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Left align navigation bar entries.
- Replace Travis CI with GitHub Actions.
- Update dependencies and development tools.

### Fixed
- Catch errors while fetching recent events to preserve UI functionality.
- Catch errors while searching for clusters to preserve UI functionality.

## [0.3.3] - 2020-05-28
### Changed
- Update dependencies.
- `jest --coverage` breaks snapshot tests for now.

## [0.3.2] - 2020-03-07
### Added
- Cluster specific actions tab.
- Render action details and history.

### Fixed
- Reflect events schema changes.

## [0.3.1] - 2019-07-15
### Added
- Cluster specific agents tab.
- Cluster specific events tab.
- Cluster specific nodes tab.

### Changed
- Improve loading of cluster overview page.

## [0.3.0] - 2019-06-17
### Changed
- **BREAKING** Update APIs to match latest Replicante Core.

## [0.2.0] - 2019-02-25
### Added
- Docker images.

### Changed
- **BREAKING**: Update events format to match replicante v0.2.0.

## 0.1.0 - 2018-06-28
### Added
- Cluster overview and discovery information.
- Events list and overview.
- List and search clusters.
- List largest clusters.
- Main navigation.
- UI data fetching component.

[Unreleased]: https://github.com/replicante-io/replicante/compare/v0.3.3...HEAD
[0.3.3]: https://github.com/replicante-io/replicante/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/replicante-io/replicante/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/replicante-io/replicante/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/replicante-io/replicante/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/replicante-io/replicante/compare/v0.1.0...v0.2.0
