const fs = require("fs")
const secrets = require("gitops-secrets");
const ENCRYPTED_SECRETS_PATH = "./lib/secrets.enc.js"

try {
  // Fetch secrets in JSON format for easy dserialization and avoiding potential  .env file formatting issues
  const DOPPLER_SECRETS = secrets.providers.doppler.fetch("json");

  // Encrypt the secrets as a JS module format (cjs | esm) for easy access at runtime
  secrets.encryptToFile("./lib/secrets.enc.js", DOPPLER_SECRETS, { format: "cjs" });
  
  console.log(`Successfully encrypted secrets to ${ENCRYPTED_SECRETS_PATH}`)
} catch (error) {
  console.log(`Error encrypting secrets file: ${error}`);
  process.exit(1);
}
