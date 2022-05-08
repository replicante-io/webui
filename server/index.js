'use strict';

const path = require('path');
const express = require('express');

const proxy = require('./proxy');


const DISTRIBUTION_ROOT = path.join(__dirname, '..', 'dist');
const LISTEN_PORT = process.env.REPLI_PORT || 3000;
const STATIC_ROOT = path.join(DISTRIBUTION_ROOT, 'static');


const app = express();
function notFound(_, res) {
  res.status(404).json({error: 'Not Found'});
}

// Handle API and assets requests.
app.use('/api', proxy);
app.use('/static', express.static(STATIC_ROOT));

// Fail unhandled API and assets requests.
app.use('/api', notFound);
app.use('/static', notFound);

// For everything else serve the index page which will use the URL to route itself.
app.use((_, res) => res.sendFile(path.join(DISTRIBUTION_ROOT, 'index.html')));


app.listen(LISTEN_PORT, () => {
  console.log('Replicante WebUI server listening on port ' + LISTEN_PORT);
});
