const path = require("path");
const fs = require("fs/promises");
const process = require("process");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

const CREDENTIAL_PATH = path.join(process.cwd(), "credential.json");
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const auth = async () => {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};

const saveCredentials = async (client) => {
  const content = await fs.readFile(CREDENTIAL_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
};

const authorize = async () => {
  let client = await auth();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIAL_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};

module.exports = { authorize, SCOPES };
