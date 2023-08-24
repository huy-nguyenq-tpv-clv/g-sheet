const fs = require('fs/promises');
const process = require('process');
const path = require('path');

const saveDownloadedFile = async (filename, content, encoding = 'utf8') => {
  const filepath = path.join(process.cwd(), 'download', filename);

  await fs.writeFile(filepath, content, { encoding });
}

module.exports = { saveDownloadedFile };