const express = require('express');
const request = require('request-promise-native');

const proxyOptions = require("./config").proxyOptions;

const proxy = express.Router();

const BACKEND_ROOT = process.env.REPLI_BACKEND_ROOT || 'http://127.0.0.1:16016';
const API_UNSTABLE_ROOT = `${BACKEND_ROOT}/api/unstable`;
const API_UNSTABLE_WEBUI = `${API_UNSTABLE_ROOT}/webui`;


proxy.get('/cluster/:cluster/action/:action', (req, res) => {
  let action = req.params.action;
  let cluster = req.params.cluster;
  let url = `${API_UNSTABLE_WEBUI}/cluster/${cluster}/action/${action}`;
  let options = proxyOptions(url);
  request.get(options).then((response) => {
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
    body: req.body,
    json: true,
    ...proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/actions`),
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
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/agents`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster agents: %s", error);
    res.status(500).json({error: "failed to fetch cluster agents"});
  });
});

proxy.get('/cluster/:cluster/discovery', (req, res) => {
  let cluster = req.params.cluster;
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/discovery`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster discovery: %s", error);
    res.status(500).json({error: "failed to fetch cluster discovery"});
  });
});

proxy.get('/cluster/:cluster/events', (req, res) => {
  let cluster = req.params.cluster;
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/events`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster events: %s", error);
    res.status(500).json({error: "failed to fetch cluster events"});
  });
});

proxy.get('/cluster/:cluster/meta', (req, res) => {
  let cluster = req.params.cluster;
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/meta`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster meta: %s", error);
    res.status(500).json({error: "failed to fetch cluster meta"});
  });
});

proxy.get('/cluster/:cluster/nodes', (req, res) => {
  let cluster = req.params.cluster;
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/nodes`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster nodes: %s", error);
    res.status(500).json({error: "failed to fetch cluster nodes"});
  });
});

proxy.get('/cluster/:cluster/orchestrate_report', (req, res) => {
  let cluster = req.params.cluster;
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/orchestrate_report`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster orchestrate report: %s", error);
    res.status(500).json({error: "failed to fetch cluster orchestrate report"});
  });
});

proxy.get('/cluster/:cluster/orchestrator-action/:action', (req, res) => {
  let action = req.params.action;
  let cluster = req.params.cluster;
  let url = `${API_UNSTABLE_WEBUI}/cluster/${cluster}/orchestrator-action/${action}`;
  let options = proxyOptions(url);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster orchestrator action: %s", error);
    res.status(500).json({error: "failed to fetch cluster orchestrator action"});
  });
});

proxy.post('/cluster/:cluster/orchestrator-actions', express.json())
proxy.post('/cluster/:cluster/orchestrator-actions', (req, res) => {
  let cluster = req.params.cluster;
  let options = {
    method: 'POST',
    body: req.body,
    json: true,
    ...proxyOptions(`${API_UNSTABLE_WEBUI}/cluster/${cluster}/orchestrator-actions`),
  };
  request(options).then((response) => {
    res.json(response);

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch cluster orchestrator actions: %s", error);
    res.status(500).json({error: "failed to fetch cluster orchestrator actions"});
  });
});


proxy.post('/clusters/search', express.json(), (req, res) => {
  let search = req.body.search || '';
  if (search) {
    search = '/' + search;
  }

  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/clusters/find${search}`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to search clusters: %s", error);
    res.status(500).json({error: "failed to search for clusters"});
  });
});

proxy.get('/clusters/top', (req, res) => {
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/clusters/top`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch top clusters: %s", error);
    res.status(500).json({error: "failed to fetch top clusters"});
  });
});


proxy.get('/events', (req, res) => {
  let options = proxyOptions(`${API_UNSTABLE_WEBUI}/events`);
  request.get(options).then((response) => {
    res.json(JSON.parse(response));

  }).catch((error) => {
    console.log("[ERROR] Failed to fetch recent events: %s", error);
    res.status(500).json({error: "failed to fetch recent events"});
  });
});


module.exports = proxy;
