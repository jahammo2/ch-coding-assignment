const crypto = require("crypto");

function createHash(string) {
  return crypto.createHash("sha3-512").update(string).digest("hex");
}

module.exports = createHash;
