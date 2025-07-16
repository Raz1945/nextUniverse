import mongoose from 'mongoose';
const { Schema } = mongoose;

const warehouseSchema = new Schema({
  currentLevel: Number,
  capacity: Number,
});

export default mongoose.model('Warehouse', warehouseSchema);
