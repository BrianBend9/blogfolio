const bluebird = require('bluebird');

const {
  DB_USER,
  DB_USER_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  options: {
    user: DB_USER,
    pass: DB_USER_PASSWORD,
    promiseLibrary: bluebird,
    bufferCommands: false,
  },

  dbMeta: [DB_HOST, DB_PORT, DB_NAME],
};
