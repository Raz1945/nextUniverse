import mongoose from 'mongoose';
const { Schema } = mongoose;

const installSchema = new Schema({
  plantType: String,
  currentLevel: Number,
  efficiency: Number,
  cost: {
    metal: Number,
    crystal: Number,
    deuterium: Number,
  },
  value: Number,
});

export default mongoose.model('Install', installSchema);
