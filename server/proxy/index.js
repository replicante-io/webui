const express = require('express');
const request = require('request-promise-native');

const proxy = express.Router();

const BACKEND_ROOT = process.env.REPLI_BACKEND_ROOT || 'http://localhost:16016';
const API_UNSTABLE_ROOT = `${BACKEND_ROOT}/api/unstable`;
const API_UNSTABLE_WEBUI = `${API_UNSTABLE_ROOT}/webui`;


proxy.get('/cluster/:cluster/action/:action', (req, res) => {
  let action = req.params.action;
  let cluster = req.params.cluster;
  request.get(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/action/${action}`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster action: %s", error);
    res.status(500).json({error: "failed to fetch cluster action"});
  });
});

proxy.post('/cluster/:cluster/actions', express.json())
proxy.post('/cluster/:cluster/actions', (req, res) => {
  let cluster = req.params.cluster;
  let options = {
    method: 'POST',
    uri: `${API_UNSTABLE_WEBUI}/cluster/${cluster}/actions`,
    body: req.body,
    json: true,
  };
  request(options).then((response) => {
    res.json(response);

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster actions: %s", error);
    res.status(500).json({error: "failed to fetch cluster actions"});
  });
});

proxy.get('/cluster/:cluster/agents', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/agents`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster agents: %s", error);
    res.status(500).json({error: "failed to fetch cluster agents"});
  });
});

proxy.get('/cluster/:cluster/discovery', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/discovery`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster discovery: %s", error);
    res.status(500).json({error: "failed to fetch cluster discovery"});
  });
});

proxy.get('/cluster/:cluster/events', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/events`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster events: %s", error);
    res.status(500).json({error: "failed to fetch cluster events"});
  });
});

proxy.get('/cluster/:cluster/meta', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/meta`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster meta: %s", error);
    res.status(500).json({error: "failed to fetch cluster meta"});
  });
});

proxy.get('/cluster/:cluster/nodes', (req, res) => {
  let cluster = req.params.cluster;
  request.get(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/nodes`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster nodes: %s", error);
    res.status(500).json({error: "failed to fetch cluster nodes"});
  });
});


proxy.post('/clusters/search', express.json(), (req, res) => {
  let search = req.body.search || '';
  if (search) {
    search = '/' + search;
  }

  request.get(`${API_UNSTABLE_WEBUI}/clusters/find${search}`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to search clusters: %s", error);
    res.status(500).json({error: "failed to search for clusters"});
  });
});

proxy.get('/clusters/top', (req, res) => {
  request.get(`${API_UNSTABLE_WEBUI}/clusters/top`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch top clusters: %s", error);
    res.status(500).json({error: "failed to fetch top clusters"});
  });
});


proxy.get('/events', (req, res) => {
  request.get(`${API_UNSTABLE_WEBUI}/events`).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch recent events: %s", error);
    res.status(500).json({error: "failed to fetch recent events"});
  });
});


module.exports = proxy;
