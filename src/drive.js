const { google } = require('googleapis');
const Logger = require('../utils/logger');


const service = auth => google.drive({ version: 'v3', auth });

const getFiles = async (auth) => {
  const res = await service(auth).files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    Logger.error('No files found.');
    return;
  }

  return files;
}

const getFileBlob = auth => async (fileId, options = {}) => {
  try {
    const res = await service(auth).files.export({
      ...options,
      fileId,
    }, {
      responseType: options.resType || 'arraybuffer'
    });
    if (res.status !== 200) {
      Logger.error(`Something went wrong when try to export a file from Drive [${res.status}]:`, res.statusText);
      return null;
    }
    return res.data;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

module.exports = { getFiles, getFileBlob, service }