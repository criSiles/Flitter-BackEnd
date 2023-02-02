'use strict';

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connection.on('error', err => {
  console.log('MongoDB error conexion', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB in', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1/flitter')

module.exports = mongoose.connection;