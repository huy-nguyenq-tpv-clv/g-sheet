const express = require('express');
const Logger = require('./utils/logger');
const { authorize } = require('./src');
const { getFileBlob } = require('./src/drive');
const app = express()
const port = 4009

app.get('/download', async (req, res) => {
  const id = req.query.id;
  const auth = await authorize();

  res.setHeader('Content-Disposition', `attachment; filename="exported_sheet.xlsx"`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  const stream = await getFileBlob(auth)(id, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    resType: 'stream',
  });

  stream.pipe(res);
})

app.listen(port, () => {
  Logger.info('Listening on port', port)
})