// Importación de mongoose
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // __v: agrega la fecha de creación y actualización
);

export default mongoose.model('User', userSchema);

// todo --> definir roles
