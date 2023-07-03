const mongoose = require("mongoose");
const dbURI = "mongodb://mongo:27017/todos";
mongoose.set('debug', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error('Database connection error:', error));

module.exports = mongoose.connection;