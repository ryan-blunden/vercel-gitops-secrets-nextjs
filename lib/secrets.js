// A stripped down Vercel compatible API is required at runtime
const secrets = require("gitops-secrets/vercel");
const cipherText = require("./secrets.enc.js");

// Decrypted secrets cache
let SECRETS;

function fetch() {
  if (!SECRETS) {
    /**
     * Decryption must be done within a function to support use in pages as the GITOPS_SECRETS_MASTER_KEY environment variable is only visible
     * to code called inside getServerSideProps and getStaticProps, hence why decryption can't occur at the root level of this module.
     */
    SECRETS = secrets.decryptJSON(cipherText);
  }
  return SECRETS;
}

function populateEnv() {
  process.env = { ...process.env, ...fetch() };
}

module.exports = {
  fetch: fetch,
  populateEnv: populateEnv,
};
