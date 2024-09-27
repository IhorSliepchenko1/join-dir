const fs = require(`fs`);

const MainFunctions = {
  // создание файла
  createFile: async (path, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  },

  // добавление чего то в файл
  appendFileData: async (path, data) => {
    return new Promise((resolve, reject) => {
      fs.appendFile(path, data, { encoding: `utf-8` }, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  },

  //   прочтение файла
  readFileData: async (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: `utf-8` }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  },
  readDir: async (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, { encoding: `utf-8` }, (error, files) => {
        if (error) {
          reject(error);
        }
        resolve(files);
      });
    });
  },

  deleteFile: async (path) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  },
  deleteFolder: async (path) => {
    return new Promise((resolve, reject) => {
      fs.rm(path, { recursive: true, force: true }, (error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  },
};

module.exports = MainFunctions;
