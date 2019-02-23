# Overview
[Replicante](https://www.replicante.io/) is a centralised monitoring and management tool.

Replicante Core provides and add-on WebUI interface.


## Usage
Replicante WebUI instances can be started with the following command:
```bash
docker run --rm -it \
  -p 3000:3000 -e 'REPLI_BACKEND_ROOT=http://replicante.api:16016'
  replicanteio/webui:v0
```


## More
For more information, the following links may be useful:

  * [Official website](https://www.replicante.io/)
  * [GitHub repo](https://github.com/replicante-io/webui)
