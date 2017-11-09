var crypto = require('crypto');

exports.crypto_dev = function (v) {
  var hash = crypto.createHash('sha1');

  hash.update(v);

  v = hash.digest('hex');

  return v
}

