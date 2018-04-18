const express = require('express');
const request = require('request-promise-native');

const proxy = express.Router();

const BACKEND_ROOT = process.env.REPLI_BACKEND_ROOT || 'http://localhost:16016';


proxy.get('/cluster/:cluster/discovery', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${BACKEND_ROOT}/webui/cluster/${cluster}/discovery`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster meta: %s", error);
    res.status(500).json({error: "failed to fetch cluster meta"});
  });
});

proxy.get('/cluster/:cluster/meta', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${BACKEND_ROOT}/webui/cluster/${cluster}/meta`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster meta: %s", error);
    res.status(500).json({error: "failed to fetch cluster meta"});
  });
});


proxy.post('/clusters/search', express.json(), (req, res) => {
  let search = req.body.search || '';
  if (search) {
    search = '/' + search;
  }

  request.get(BACKEND_ROOT + '/webui/clusters/find' + search).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to search clusters: %s", error);
    res.status(500).json({error: "failed to search for clusters"});
  });
});

proxy.get('/clusters/top', (req, res) => {
  request.get(BACKEND_ROOT + '/webui/clusters/top').then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch top clusters: %s", error);
    res.status(500).json({error: "failed to fetch top clusters"});
  });
});


module.exports = proxy;
