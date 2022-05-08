# Replicante WebUI

Bare bones web-based user interface for Replicante.
Its main purpose is to visualise the current state of your clusters
and what is happening to them.

## Code of Conduct

Our aim is to build a thriving, healthy and diverse community.  
To help us get there we decided to adopt the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/)
for all our projects.

Any issue should be reported to [stefano-pogliani](https://github.com/stefano-pogliani)
by emailing [conduct@replicante.io](mailto:conduct@replicante.io).  
Unfortunately, as the community lucks members, we are unable to provide a second contact to report
incidents to. We would still encourage people to report issues, even anonymously.

In addition to the Code Of Conduct below the following documents are relevant:

* The [Reporting Guideline](https://www.replicante.io/conduct/reporting), especially if you wish to
  report an incident.
* The [Enforcement Guideline](https://www.replicante.io/conduct/enforcing)

## Install

```bash
git clone https://github.com/replicante-io/webui.git
cd webui/
npm install
npm run build
```

## Usage

```bash
export REPLI_BACKEND_ROOT="http://localhost:16016"
npm run server
```

## Docker image

Build the image with the following command:

```bash
docker build --force-rm --tag replicanteio/webui:v$VERSION .
```

The image can then be used with:

```bash
docker run --rm -it -e 'REPLI_BACKEND_ROOT=http://replicante.api:16016' replicanteio/webui:v0.3
```

## Roadmap

The main roadmap topics are determined by the Replicante project.
Here are a few items that are specific to this WebIU project:

* Migrate to TypeScript (this includes removing all flow annotations and using TS instead).
* Bootstrap 5 upgrade.
* [Maybe?] Replace `react` with `vue.js`.
