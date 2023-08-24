const { authorize, download } = require('./src');

const main = async () => {
  const auth = await authorize();

  // Read sheet data by sheetId & range
  // const sheetData = await read(auth)('1WjHyf0XiqGn9B8M6TB_0zhGS1nN7pc4HUYwAHVv1_mQ', 'Sample Sheet Demo!A:E');

  // Update sheet data by sheetId, range & its values
  // const sheetData = await write(auth)('1WjHyf0XiqGn9B8M6TB_0zhGS1nN7pc4HUYwAHVv1_mQ', 'Sample Sheet Demo!A10:E', [
  //   ['New Field 1', 'New Field 2', 'New Field 3', '', 'New Field 4'],
  //   ['New Value 1', 'New Value 2', 'New Value 3', '', 'New Value 4'],
  // ]);

  // Create a new sheet by its name
  // const newSheet = await create(auth)('Just a simple sheet')
  // console.log(newSheet);

  // Get all of files in Drive
  // const files = await getFiles(auth);
  // files.forEach(f => {
  //   console.log('[+]', f.id, ' - ', f.name);
  // })

  // Share a sheet with someone by their email
  // const res = await shareWithUser(auth)('1WjHyf0XiqGn9B8M6TB_0zhGS1nN7pc4HUYwAHVv1_mQ', 'nqh.d3v@gmail.com')

  // Download a sheet & save it to download folder
  await download(auth)('1WjHyf0XiqGn9B8M6TB_0zhGS1nN7pc4HUYwAHVv1_mQ');
}

main();