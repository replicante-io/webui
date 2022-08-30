const fs = require("fs");

const BACKEND_CA = process.env.REPLI_CA_PATH;
const BACKEND_CLIENT_CERT = process.env.REPLI_CLIENT_CERT_PATH;
const BACKEND_CLIENT_KEY = process.env.REPLI_CLIENT_KEY_PATH;
const BACKEND_ROOT = process.env.REPLI_BACKEND_ROOT || 'http://127.0.0.1:16016';

const API_UNSTABLE_ROOT = `${BACKEND_ROOT}/api/unstable`;
const API_UNSTABLE_WEBUI = `${API_UNSTABLE_ROOT}/webui`;

// Load the TLS files, if set.
const CA_CONTENTS = BACKEND_CA ? fs.readFileSync(BACKEND_CA) : null;
const CLIENT_CERT_CONTENTS = BACKEND_CLIENT_CERT ? fs.readFileSync(BACKEND_CLIENT_CERT) : null;
const CLIENT_KEY_CONTENTS = BACKEND_CLIENT_KEY ? fs.readFileSync(BACKEND_CLIENT_KEY) : null;

/**
 * Return an options object for `request` methods with global client options added.
 *
 * @param {String} url URL to send the request to.
 * @returns {Object} Options for `request` methods.
 */
function proxyOptions(url) {
  return {
    ca: CA_CONTENTS,
    cert: CLIENT_CERT_CONTENTS,
    key: CLIENT_KEY_CONTENTS,
    url: url,
  };
}

module.exports = {
  BACKEND_CA,
  BACKEND_CLIENT_CERT,
  BACKEND_CLIENT_KEY,
  BACKEND_ROOT,

  API_UNSTABLE_ROOT,
  API_UNSTABLE_WEBUI,

  proxyOptions,
};
