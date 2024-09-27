const fs = require(`fs`);
const path = require(`path`);
const MainFunctions = require(`./functions`);

const dataFilesDir = async () => {
  const folder = path.resolve(__dirname, `dir`);

  const files = await MainFunctions.readDir(folder);
  const sharedFolder = path.resolve(__dirname, `output.csv`);

  if (fs.existsSync(sharedFolder)) {
    const readFile = await MainFunctions.readFileData(sharedFolder);

    if (readFile.length > 0) {
      await MainFunctions.deleteFile(sharedFolder);
      console.log(`файл удалён`);
    }
  }

  if (!fs.existsSync(sharedFolder)) {
    await MainFunctions.createFile(sharedFolder, `номер;город;дата;файл\n`);
    console.log(`файл создан`);
  }

  files.map(async (internalFolder) => {
    const attachments = await MainFunctions.readDir(
      path.resolve(__dirname, folder, internalFolder)
    );

    attachments.map(async (fileTxt) => {
      const data = await MainFunctions.readFileData(
        path.resolve(__dirname, folder, internalFolder, fileTxt)
      );

      const fileData = data.split(`\n`);

      const result = fileData.map((file) => {
        return file + `;${internalFolder};${fileTxt}\n`;
      });

      await MainFunctions.appendFileData(sharedFolder, result.join(``));
    });

    await MainFunctions.deleteFolder(path.resolve(folder, internalFolder));
  });
};

dataFilesDir();
