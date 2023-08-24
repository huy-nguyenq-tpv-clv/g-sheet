const { google } = require("googleapis");
const fs = require('fs/promises');
const moment = require("moment");
const { v4: uuid } = require('uuid');
const { getFileBlob } = require("./drive");
const { EXPIRES_SHEET_DAYS, RFC3339_FORMAT } = require("../utils/constants");
const { saveDownloadedFile } = require("./file");
const Logger = require("../utils/logger");

const service = (auth) => google.sheets({ version: "v4", auth });

const sheetInfo = (auth) => async (sheetId) => {
  const res = await service(auth).spreadsheets.get({ spreadsheetId: sheetId });
  if (res.status !== 200) {
    Logger.error("Cannot get file's info:", res.statusText);
    return null;
  }
  return res.data;
};

// Main functions
const create = (auth) => async (title) => {
  const resource = {
    properties: {
      title,
    },
  };
  try {
    const spreadsheet = await service(auth).spreadsheets.create({
      resource,
      fields: "spreadsheetId",
    });
    return spreadsheet.data.spreadsheetId;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
};

const read = (auth) => async (sheetId, range) => {
  const sheets = service(auth);
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range, // 'Class Data!A2:E'
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    Logger.error("No data found.");
    return;
  }
  return rows;
};

const write = (auth) => async (sheetId, range, values) => {
  const sheets = service(auth);
  const resource = {
    values,
  };
  try {
    const result = await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const shareWithUser =
  (auth) =>
    async (sheetId, userEmail, options = {}) => {
      const info = await sheetInfo(auth)(sheetId);
      if (!info) {
        return null;
      }
      const expirationTime = moment()
        .add(EXPIRES_SHEET_DAYS, "days")
        .endOf("day")
        .format(RFC3339_FORMAT);
      const permission = await google
        .drive({ version: "v3", auth })
        .permissions.create({
          fileId: sheetId,
          emailMessage:
            options.message ||
            `This file is available in ${EXPIRES_SHEET_DAYS} days.`,
          sendNotificationEmail: true,
          requestBody: {
            type: "user",
            role: "writer",
            expirationTime,
            emailAddress: userEmail,
          },
        });

      return permission;
    };

const download = (auth) => async (sheetId) => {
  const info = await sheetInfo(auth)(sheetId);
  if (!info) {
    return null;
  }
  Logger.fileInfo(sheetId, info.properties.title, info.sheets.length)
  const res = await getFileBlob(auth)(
    sheetId,
    { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
  );
  if (!res) {
    return;
  }
  const buffer = Buffer.from(res, 'binary');

  const filename = uuid();
  // Save the Buffer to a file
  await saveDownloadedFile(`${filename}.xlsx`, buffer);
  Logger.done(`Saved downloaded file to 'download/${filename}.xlsx'`)

  return res;
};

module.exports = { service, read, write, create, download, shareWithUser };
