const path = require('path');

const express = require('express');
const app = express();


const DIST_ROOT = path.join(__dirname, '..', 'dist');
const STATIC_ROOT = path.join(DIST_ROOT, 'static');


app.use('/static', express.static(STATIC_ROOT));
app.use((_, res) => res.sendFile(path.join(DIST_ROOT, 'index.html')));


app.listen(3000, () => console.log('Replicante WebUI server listening on port 3000'));
