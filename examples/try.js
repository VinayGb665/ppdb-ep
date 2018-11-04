var storj = require('storj-lib');

var bridgeURL = "https://api.storj.io"
var options = {
  basicAuth: {
    email: process.env.STORJ_EMAIL,
    password: process.env.STORJ_PASSWORD
  }
}

var client = new storj.BridgeClient(bridgeURL, options);