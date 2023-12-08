const mongoose = require('mongoose');
const { Schema } = mongoose;

const installSchema = new Schema({
  plantType: String,
  currentLevel: Number,
  efficiency: Number,
  cost: Number,
  value: Number,
});

module.exports = installSchema;
