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
  countdown: {
    type: String,
    default: '3 minutos', // Valor de prueba
  },
});

export default mongoose.model('Install', installSchema);
