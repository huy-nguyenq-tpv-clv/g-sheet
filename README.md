# Example to work with Google Sheet & Google Drive APIs
> This is a sample project, which shows how I can read, update, get content, share or download a Google Sheet file from my drive.

Before start, let set up your app.
## Setup
### Google Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/projectcreate) to create a new project.

   > Read [this document](https://developers.google.com/sheets/api/guides/concepts) to know how to create a Google Project.

2. Next, go to [Consent Screen Setup](https://console.cloud.google.com/apis/credentials/consent) to setup Consent Screen for your app.

3. Next, go to [API Library](https://console.cloud.google.com/apis/library) to enable APIs for your app.
   Find `Google Sheets API` & `Google Drive API` and enable it.

4. Now, go to [Credential](https://console.cloud.google.com/apis/credentials) to create an **OAuth 2.0 Client IDs** (Type: Desktop). Download your credential file.

### App
1. Create `credential.json` & `token.json` file at the root folder.
2. Copy content of your credential file and paste it to `credential.json`.

## Start your app
I have 2 solutions to know how it works.
- Run function by function.
  
  Edit `index.js` with your function, which you want to run and type command `node index.js`.
- Run a server and call with API.
  
  Edit `server.js` with your configuration. Type command `node server.js` to start your server.

For all functions, please view in `src` folder.

Currently, I just use server to test download file with `spreadsheetId`.