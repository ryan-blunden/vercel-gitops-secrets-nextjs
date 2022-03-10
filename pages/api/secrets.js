// Test accessing secrets from an API endpoint
const SECRETS = require("../../lib/secrets").fetch();
const SECRETS_SIZE_KB = parseFloat(Buffer.byteLength(JSON.stringify(SECRETS), 'utf8') / 1024).toFixed(2)

export default function handler(req, res) {
  res.status(200).json({
   SECRETS_KEYS: Object.keys(SECRETS),
   SECRETS_SIZE: `${SECRETS_SIZE_KB} KB`
  });
}
