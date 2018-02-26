const mongoose = require('mongoose');

module.exports = {
  connect: (host, port, dbName, options) => mongoose.connect(`mongodb://${host}:${port}/${dbName}`, options),
};
