const mongoose = require('mongoose');
const { Schema } = mongoose;

const warehouseSchema = new Schema({
  currentLevel: Number,
  capacity: Number,
});

module.exports = warehouseSchema;
