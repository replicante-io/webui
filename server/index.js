'use strict';

const path = require('path');
const express = require('express');

const proxy = require('./proxy');


const DIST_ROOT = path.join(__dirname, '..', 'dist');
const LISTEN_PORT = process.env.REPLI_PORT || 3000;
const STATIC_ROOT = path.join(DIST_ROOT, 'static');


const app = express();

app.use('/api', proxy);
app.use('/static', express.static(STATIC_ROOT));
app.use((_, res) => res.sendFile(path.join(DIST_ROOT, 'index.html')));


app.listen(LISTEN_PORT, () => {
  console.log('Replicante WebUI server listening on port ' + LISTEN_PORT);
});
