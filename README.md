# Replicante WebUI
Bare bones web-based user interface for Replicante.
Its main purpose is to visualise the current state of your clusters
and what is happening to them.


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
docker run --rm -it -e 'REPLI_BACKEND_ROOT=http://replicante.api:16016' replicanteio/webui:v0.2
```
